import User from "../models/user";
import jwt from "jsonwebtoken";
// import AWS from "aws-sdk";
import SES from "aws-sdk/clients/ses";
import { nanoid } from "nanoid";
import {
  completeRegistrationParams,
  forgotPasswordParams,
} from "../utils/email";
import { hashPassword, comparePassword } from "../utils/auth";
import sendMail from "./sendMail";

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

// aws config
const ses = new SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
});

// export const register = async (req, res) => {
//   try {
//     // console.log(req.body);
//     const { name, email, password } = req.body;
//     // validation
//     if (!name) return res.status(400).send("Name is required");
//     if (!password || password.length < 6)
//       return res
//         .status(400)
//         .send("Password is required and should be min 6 characters long");
//     // use .lean() on queries for improved performance
//     // it returns plain json object instead of mongoose document
//     let userExist = await User.findOne({ email }).exec();
//     if (userExist) return res.status(400).send("Email is taken");

//     // send email with register activation link
//     const jwtLink = jwt.sign(
//       { name, email, password },
//       process.env.JWT_REGISTER_COMPLETE,
//       {
//         expiresIn: "90d",
//       }
//     );
//     const params = completeRegistrationParams(email, jwtLink);
//     // send
//     const emailSent = ses.sendEmail(params).promise();
//     emailSent
//       .then((data) => {
//         // console.log(data);
//         return res.json({ ok: true });
//       })
//       .catch((err) => {
//         console.log("ERRRRRRRRRRRRRRRRR ===>", err);
//       });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send("Error. Try again.");
//   }
// };

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validate
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExit = await User.findOne({ email }).exec();
    if (userExit) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    const activation_token = createActivationToken(user);
    const url = `${process.env.CLIENT_URL}/activate-mail/${activation_token}`;
    sendMail(email, url, "Verify your email address");

    res.json({
      ok: true,
      msg: "Register successful. Please activate your email to start",
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send("Error. Try again.");
  }
};

export const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { name, email, password } = user;
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "Account has exist" });

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.json({ msg: "Account has been activated" });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const registerActivate = async (req, res) => {
  const { jwtLink } = req.body;
  if (!jwtLink) return res.status(400).send("Unauthorized");

  jwt.verify(
    jwtLink,
    process.env.JWT_REGISTER_COMPLETE,
    async function (err, decoded) {
      if (err) return res.status(400).send("Expired link. Register again");

      const { name, email, password } = jwt.decode(jwtLink);

      // hash password
      const hashedPassword = await hashPassword(password);

      try {
        // register
        const user = await new User({
          name,
          email,
          password: hashedPassword,
        }).save();
        return res.json({ ok: true });
      } catch (err) {
        console.log(err);
        return res.status(400).send("Register error. Try again.");
      }
    }
  );
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");

    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");

    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
      path: "/user/refresh_token",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    user.passwordResetCode = undefined;
    // without httpOnly, javascript will get access to cookie in browser
    // so to protect token use true
    res.cookie("token", token, {
      // httpOnly: true,
      secure: true, // only works on https
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const currentUser = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select("-password").exec();
    // console.log(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout success!" });
  } catch (err) {
    console.log(err);
  }
};

export const forgotPassword = async (req, res) => {
  // try {
  //   const { email } = req.body;
  //   // console.log(email);
  //   // generate unique code
  //   const shortCode = nanoid(6).toUpperCase();
  //   // console.log(shortCode);
  //   // save shortcode as passwordResetCode in db
  //   let user = await User.findOneAndUpdate(
  //     { email },
  //     { passwordResetCode: shortCode }
  //   ).exec();
  //   // console.log(found);
  //   if (!user) return res.status(400).send("User not found");

  //   // prepare for email
  //   const params = forgotPasswordParams(email, shortCode);
  //   // send
  //   const emailSent = ses.sendEmail(params).promise();
  //   emailSent
  //     .then((data) => {
  //       console.log(data);
  //       res.json({ ok: true });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    const { email } = req.body;
    // const shortCode = nanoid(6).toLowerCase();
    // const user = await User.findOneAndUpdate(
    //   { email },
    //   {
    //     passwordResetCode: shortCode,
    //   }
    // );

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("User is not exist");

    // prepare for email
    // Googleapis
    // const access_token = createAccessToken({ id: user._id });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token to cookie
    res.cookie("token", token, {
      // httpOnly: true,
      secure: true, // only works on https
    });
    const url = `${process.env.CLIENT_URL}/user/reset/${token}`;
    sendMail(email, url, "Reset your password");
    res.json({ msg: "Re-send the password, please check your email." });

    // AWS
    // const params = {
    //   Source: process.env.EMAIL_FROM,
    //   Destination: {
    //     ToAddresses: [email],
    //   },
    //   Message: {
    //     Body: {
    //       Html: {
    //         Charset: "UTF-8",
    //         Data: `
    //         <html>
    //           <h1>Reset password</h1>
    //           <p>Use this code to reset password</p>
    //           <h2 style="color: red;">${shortCode}</h2>
    //         </html>
    //         `,
    //       },
    //     },
    //     Subject: {
    //       Charset: "UTF-8",
    //       Data: "Reset password",
    //     },
    //   },
    // };

    // const emailSent = SES.sendEmail(params).promise();
    // emailSent.then((data) => {
    //   console.log(data);
    //   res.json({ ok: true });
    // });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  // try {
  // const { email, code, newPassword } = req.body;
  //----test
  // console.log("email, code", email, code);
  // let u = await User.findOne({ email, passwordResetCode: code });
  // console.log("FOUND USER", u);
  // return;
  //--test

  // hash password
  //   const hashedPassword = await hashPassword(newPassword);

  //   let user = await User.findOneAndUpdate(
  //     { email, passwordResetCode: code },
  //     {
  //       password: hashedPassword,
  //       passwordResetCode: "",
  //     },
  //     { new: true }
  //   ).exec();
  //   // console.log("password reset done", user);
  //   res.json({ ok: true });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).send("Error. Try again.");
  // }

  try {
    const { password } = req.body;

    const passwordHash = await hashPassword(password);

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Password successfully changed" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.MAILING_SERVICE_CLIENT_ID,
    });

    console.log(verify);

    const { email_verified, email, name, picture } = verify.payload;

    const password = email + process.env.GOOGLE_SECRET;

    const passwordHash = await hashPassword(password);

    if (!email_verified)
      return res.status(400).json({ msg: "Email verification failed." });

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      //create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // return user and token to client, exclude hashed password
      user.password = undefined;
      // send token to cookie
      res.cookie("token", token, {
        // httpOnly: true,
        secure: true, // only works on https
      });
      res.json(user);
    } else {
      const newUser = new User({
        name,
        email,
        password: passwordHash,
        picture,
      });

      await newUser.save();

      //create signed jwt
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // return user and token to client, exclude hashed password
      // user.password = undefined;
      // send token to cookie
      res.cookie("token", token, {
        // httpOnly: true,
        secure: true, // only works on https
      });
      res.json(newUser);
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

function createAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function createActivationToken(payload) {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
}

import { useEffect, useState, useContext } from "react";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Context } from "../../../context";

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const CourseCreate = () => {
  const {
    state: { user, token },
    dispatch,
  } = useContext(Context);

  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    paid: true,
    loading: false,
  });

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload image");

  const [visible, setVisible] = useState(false);

  // markdown cheetsheet modal
  const [markdownCheetsheetModal, setMarkdownCheetsheetModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await axios.get("http://localhost:8000/api/categories");
    // console.log(data);
    setCategoryList(data);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/course",
        {
          ...values,
          categories: selectedCategories,
          image,
        },
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data);
      toast("Great! Now you can start adding lectures");
      router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    Resizer.imageFileResizer(
      file, // file
      720, // maxWidth
      500, // maxHeight
      "JPEG", // compressionFormat
      100, // quality
      0, // rotation
      async (uri) => {
        // post to s3
        try {
          let { data } = await axios.post(
            "http://localhost:8000/api/course/upload-image",
            {
              image: uri,
            },
            {
              headers: { Authorization: token },
            }
          );
          // console.log("image uploaded", data);
          setImage(data);
          setValues({ ...values, loading: false });
        } catch (err) {
          setValues({ ...values, loading: false });
          toast("Image upload failed. Try again.");
          console.log(err);
        }
      },
      "base64" // outputType
    );
  };

  const handleImageRemove = async () => {
    try {
      console.log("remove image from s3 ===> ", image.Key);
      setValues({ ...values, loading: true });
      let { data } = await axios.post(
        "http://localhost:8000/api/course/remove-image",
        { image },
        {
          headers: { Authorization: token },
        }
      );
      // console.log("Remove image ===> ", data);
      if (data.ok) {
        setImage({});
        setPreview("");
        setUploadButtonText("Upload image");
        setValues({ ...values, loading: false });
      }
    } catch (err) {
      toast("Remove image failed");
      setValues({ ...values, loading: false });
    }
  };

  return (
    <InstructorRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="/instructor" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Create Course</li>
        </ul>
      </div>
      <div className="pt-3 pb-5">
        <CourseCreateForm
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          categoryList={categoryList}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
          markdownCheetsheetModal={markdownCheetsheetModal}
          setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
        />
      </div>
      {/* <pre>{JSON.stringify(image, null, 4)}</pre> */}
    </InstructorRoute>
  );
};

export default CourseCreate;

import { useContext } from "react";
import { Badge, Button } from "antd";
import { currencyFormatter } from "../../utils/helpers";
import ReactPlayer from "react-player";
import {
  SafetyOutlined,
  LoadingOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../../context";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  setPreview,
  loading,
  handleFreeEnrollment,
  handlePaidEnrollment,
  enrolled,
  setEnrolled,
}) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    image,
    price,
    paid,
    categories,
    lessons,
  } = course;

  // context
  const {
    state: { user },
  } = useContext(Context);

  return (
    <div className="bg-gray-900 ">

    <div className="square container ">
      <div className="row py-5 text-white">
        <div className="col-md-8">
          {/* title */}
          <h1 className="text-4xl text-white font-weight-bold mb-4"style={{width:"600px"}}>{name}</h1>
          {/* description */}
          <p className="lead mb-4 text-xl font-sans"style={{width:"700px"}}>
            {description && description.substring(0, 150)}...
          </p>
          {/* categories */}
          {categories.map((c) => (
            <Badge
              key={c._id}
              count={c.name}
              style={{ backgroundColor: "#03a9f4" }}
              className="pb-4 mr-2"
            />
          ))}
          {/* author */}
          <p>Created by {instructor.name}</p>
          {/* updated date */}
          <p className="my-2"><i class="fas fa-clock"></i> Last updated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
         
        </div>
         {/* video preview */}
        {/* {JSON.stringify(image.Location)} */}
        <div className="col-md-4 bg-white p-0">
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              style={{
                backgroundImage: "url(" + image.Location + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                marginBottom: "25px",
              }}
              className="d-flex justify-content-center"
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              {/* <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                light={image.Location}
                playing={false}
                //   controls={true}
                width="100%"
                height="225px"
              /> */}

              <PlayCircleFilled
                className="align-self-center display-4 text-dark"
                style={{ padding: "90px 90px 90px 90px" }}
              />
              {/* <img src={image.Location} alt={name} className="img img-fluid" /> */}
            </div>
          ) : (
            <div
              style={{
                backgroundImage: "url(" + image.Location + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                marginBottom: "25px",
              }}
              className="d-flex justify-content-center"
            >
              <span
                className="align-self-center display-4 text-dark"
                style={{ padding: "90px 90px 90px 90px" }}
              ></span>
            </div>
          )}
          {/* enroll button */}
          <h4 className="text-dark text-4xl ml-15 font-mono mb-2"style={{marginLeft:"20px"}}>
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
          
          <Button
            className="text-white"
            block
            icon={<SafetyOutlined />}
            size="large"
            disabled={loading}
            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            // style={{ width: "342px" }}
          >
            {user
              ? enrolled.status
                ? "Go to course"
                : // <Link href={`/user/course/${enrolled.course.slug}`}>
                  //   <a className="text-light"> Go to course</a>
                  // </Link>
                  "Enroll"
              : "Login to enroll"}
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleCourseJumbotron;
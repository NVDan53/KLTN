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
    <div style={{ backgroundColor: "#1c1d1f" }}>
      <div className="square container ">
        <div className="row py-5 text-white">
          <div className="col-md-8">
            {/* title */}
            <h1
              className="text-4xl text-white font-weight-bold mb-4"
              style={{ width: "600px" }}
            >
              {name}
            </h1>
            {/* description */}
            <p
              className="lead mb-4 text-xl font-sans"
              style={{ width: "700px" }}
            >
              {description && description.substring(0, 140)}..
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
            <p className="my-2">
              <i className="fas fa-clock"></i> Last updated{" "}
              {new Date(updatedAt).toLocaleDateString()}
            </p>
            {/* price */}
            <p className="my-2 text-4xl">
              {paid
                ? currencyFormatter({
                    amount: price,
                    currency: "usd",
                  })
                : "Free"}
            </p>
          </div>
          {/* video preview */}
          {/* {JSON.stringify(image.Location)} */}
          <div className="col-md-4 p-0">
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
                <PlayCircleFilled
                  className="align-self-center display-4 text-dark"
                  style={{ padding: "90px 90px 90px 90px" }}
                />
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: "url(" + image.Location + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  marginBottom: "25px",
                  height: "250px",
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

            <Button
              type="primary"
              block
              shape="round"
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

import { useContext } from "react";
import { Button, Modal, Card, Tooltip, Avatar } from "antd";
import {
  SyncOutlined,
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RightCircleOutlined,
  CommentOutlined,
  PlusCircleFilled,
  EditFilled,
  DeleteFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { Context } from "../../context";
import CodeBlock from "../marked/CodeBlock";
import MarkdownCheetsheet from "../modal/MarkdownCheatsheet";
import Link from "next/link";
import { Select } from "antd";
const { Option } = Select;
const { Meta } = Card;

const UserQaReadRemove = ({
  visible,
  setVisible,
  values,
  setValues,
  handleCreatePost,
  qas = [],
  handleQaDelete = (f) => f,
  handleQaEdit = (f) => f,
  handleAddAnswer = (f) => f,
  handleEditAnswer = (f) => f,
  handleDeleteAnswer = (f) => f,
  markdownCheetsheetModal,
  setMarkdownCheetsheetModal = (f) => f,
  markQaAsResolved = (f) => f,
  markQaAsNotResolved = (f) => f,
  instructor = false,
  handleDeleteAnswerByInstructor = (f) => f,
  handleQaDeleteByInstructor = (f) => f,
  markQaAsResolvedByInstructor = (f) => f,
  markQaAsNotResolvedByInstructor = (f) => f,
}) => {
  // state
  const {
    state: { user },
  } = useContext(Context);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <>
      <div className="row py-8 bg-white">
        {qas.map((q) => (
          <div
            key={q._id}
            className="col-md-12 mb-8 border-b-8 border-gray-100"
          >
            <div className="d-flex mb-2">
              <Avatar
                size={40}
                shape="square"
                src={
                  q.courseId && q.courseId.image
                    ? q.courseId.image.Location
                    : "/course.png"
                }
              />
              <span className="pl-2 pt-1">
                Question in{" "}
                <Link href={`/user/course/${q.courseId.slug}`}>
                  <a>
                    <i>{q.courseId && q.courseId.name}</i>
                  </a>
                </Link>
              </span>
            </div>

            {/* <div className="p-3" style={{ backgroundColor: "#f2f2f2" }}> */}
            <div className="py-3 pl-3">
              <div className="d-flex pb-3">
                <Avatar>
                  <span>
                    {q.postedBy && q.postedBy.name && q.postedBy.name[0]}
                  </span>
                </Avatar>{" "}
                <div style={{ marginTop: "-12px" }}>
                  <p className="pl-2 pt-1 font-bold uppercase text-md">
                    {q.title}
                  </p>
                  <span className="pl-2 pt-1">{q.postedBy.name}</span>
                  <span className="pl-2 pt-1">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {q.postedBy && user && user._id === q.postedBy ? (
                  <>
                    <span className="pt-1 ml-auto">
                      <Select defaultValue="select" style={{ width: 130 }}>
                        <Option value="select">Select</Option>
                        <Option value="add">
                          <p onClick={() => handleAddAnswer(q)}>Add answer</p>
                        </Option>
                        <Option value="Edit">
                          <p onClick={() => handleQaEdit(q)}>Edit answer</p>
                        </Option>
                        <Option value="Delete">
                          <p onClick={() => handleQaDelete(q)}>Delete answer</p>
                        </Option>
                      </Select>
                    </span>{" "}
                  </>
                ) : instructor ? (
                  <>
                    <span className="pt-1 ml-auto">
                      <Select defaultValue="select" style={{ width: 115 }}>
                        <Option value="select">Select</Option>
                        <Option value="add">
                          <p onClick={() => handleAddAnswer(q)}>Add answer</p>
                        </Option>

                        <Option value="Delete">
                          <p onClick={() => handleQaDeleteByInstructor(q)}>
                            Delete answer
                          </p>
                        </Option>
                      </Select>
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>

              <ReactMarkdown
                source={q.description}
                renderers={{ code: CodeBlock }}
                className="single-post pr-40"
                style={{ paddingLeft: "40px" }}
              />
            </div>

            {/* answers / comments */}

            <div style={{ paddingLeft: "40px" }}>
              {q.answers &&
                q.answers.map((a) => (
                  <>
                    <div key={a._id} style={{ borderBottom: "none" }}>
                      <div className="py-2 pl-3">
                        <p className="font-bold">
                          {" "}
                          {a.postedBy && a.postedBy.name}{" "}
                        </p>
                        <p> {new Date().toLocaleDateString()}</p>

                        {a.postedBy && user && user._id === a.postedBy._id
                          ? [
                              <Select
                                defaultValue="select"
                                // style={{ width: 130 }}
                                className="float-right"
                                style={{ marginTop: "-47px", width: "115px" }}
                              >
                                <Option value="select">Select</Option>
                                <Option value="edit">
                                  <p onClick={() => handleEditAnswer(a)}>
                                    Edit answer
                                  </p>
                                </Option>
                                <Option value="add">
                                  <p onClick={() => handleDeleteAnswer(a)}>
                                    Delete answer
                                  </p>
                                </Option>
                              </Select>,
                            ]
                          : instructor
                          ? [
                              <Select
                                defaultValue="select"
                                // style={{ width: 130 }}
                                className="float-right"
                                style={{ marginTop: "-47px", width: "115px" }}
                              >
                                <Option value="select">Select</Option>

                                <Option value="add">
                                  <p
                                    onClick={() =>
                                      handleDeleteAnswerByInstructor(a)
                                    }
                                  >
                                    Delete answer
                                  </p>
                                </Option>
                              </Select>,
                            ]
                          : []}
                      </div>
                      <>
                        <div className="pl-3 pr-40 pb-3">
                          {
                            <ReactMarkdown
                              source={a.content}
                              // renderers={{ code: CodeBlock }}
                            />
                          }
                        </div>
                      </>
                      <></>
                    </div>
                  </>
                ))}

              <button
                className="mt-8 w-full text-dark border-solid border-2 border-light-blue-500 font-bold py-2 pr-3 bg-gray-200"
                onClick={() => handleAddAnswer(q)}
                style={{ marginBottom: "50px" }}
              >
                Add reply123
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default UserQaReadRemove;

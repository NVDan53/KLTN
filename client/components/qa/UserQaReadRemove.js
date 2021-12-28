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

  return (
    <>


      <div className="row"style={{marginLeft:"16px",marginRight:"16px"}}>
        {qas.map((q) => (
          <div key={q._id} className="col-md-12 pb-2 border-2 bg-white">
            <div className="d-flex my-2">
              <Avatar
                size={80}
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
                <p className="pl-2 pt-1">
                  {new Date(q.createdAt).toLocaleDateString()}
                </p>
              </span>
            </div>

            <div className="">
              <div className="d-flex pb-3 ">
               
                <span className="pl-2 pt-1">{q.postedBy.name}</span>
                {q.postedBy && user && user._id === q.postedBy ? (
                <div className="d-flex justify-content-around items-center">
                  <Tooltip title="Add answer">
                    <PlusCircleFilled
                      onClick={() => handleAddAnswer(q)}
                      className="text-success mx-2"
                    />
                  </Tooltip>
                  <Tooltip onClick={() => handleQaEdit(q)} title="Edit">
                    <EditFilled className="text-warning mx-2" />
                  </Tooltip>
                  <Tooltip onClick={() => handleQaDelete(q)} title="Delete">
                    <DeleteFilled className="text-danger mx-2" />
                  </Tooltip>
                  <Tooltip
                    onClick={() =>
                      q.resolved ? markQaAsNotResolved(q) : markQaAsResolved(q)
                    }
                    title={q.resolved ? "Mark unresolved" : "Mark resolved"}
                  >
                    {q.resolved ? (
                      <CloseCircleFilled className="text-info mx-2" />
                    ) : (
                      <CheckCircleFilled className="text-info mx-2" />
                    )}
                  </Tooltip>
                </div>
              ) : instructor ? (
                <div className="d-flex justify-content-around items-center">
                  <Tooltip title="Add answer">
                    <PlusCircleFilled
                      onClick={() => handleAddAnswer(q)}
                      className="text-success mx-2"
                    />
                  </Tooltip>

                  <Tooltip
                    onClick={() => handleQaDeleteByInstructor(q)}
                    title="Delete"
                  >
                    <DeleteFilled className="text-danger mx-2" />
                  </Tooltip>

                  <Tooltip
                    onClick={() =>
                      q.resolved
                        ? markQaAsNotResolvedByInstructor(q)
                        : markQaAsResolvedByInstructor(q)
                    }
                    title={q.resolved ? "Mark unresolved" : "Mark resolved"}
                  >
                    {q.resolved ? (
                      <CloseCircleFilled className="text-info mx-2" />
                    ) : (
                      <CheckCircleFilled className="text-info mx-2" />
                    )}
                  </Tooltip>
                </div>
              ) : (
                ""
              )}
                <span className="pt-1 ml-auto">
                  {q.answers && q.answers.length + " answers"}
                </span>
              </div>         

              <ReactMarkdown
                source={q.description}
                renderers={{ code: CodeBlock }}
                className="single-post"
              />

             
            </div>
            {/* answers / comments */}
            {q.answers &&
              q.answers.map((a) => (
                <Card
                  // style={{ backgroundColor: "#fcfdff" }}
                  key={a._id}
                  actions={
                    a.postedBy && user && user._id === a.postedBy._id
                      ? [
                          <Tooltip title="Edit answer">
                            <EditOutlined onClick={() => handleEditAnswer(a)} />
                          </Tooltip>,
                          <Tooltip title="Delete answer">
                            <DeleteOutlined
                              onClick={() => handleDeleteAnswer(a)}
                            />
                          </Tooltip>,
                        ]
                      : instructor
                      ? [
                          <Tooltip title="Delete answer">
                            <DeleteOutlined
                              onClick={() => handleDeleteAnswerByInstructor(a)}
                            />
                          </Tooltip>,
                        ]
                      : []
                  }
                >
                  <Meta
                    avatar={<CommentOutlined />}
                    title={`By ${a.postedBy && a.postedBy.name} ${new Date(
                      q.createdAt
                    ).toLocaleDateString()}`}
                    description={
                      <ReactMarkdown
                        source={a.content}
                        renderers={{ code: CodeBlock }}
                        className="single-post"
                      />
                    }
                  />
                </Card>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserQaReadRemove;

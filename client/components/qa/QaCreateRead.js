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
import CodeBlock from "../../components/marked/CodeBlock";
import MarkdownCheetsheet from "../../components/modal/MarkdownCheatsheet";
import Link from "next/link";
import { Select } from "antd";
const { Option } = Select;
const { Meta } = Card;

const QaCreateRead = ({
  visible,
  setVisible,
  values,
  setValues,
  handleCreatePost,
  clickedLessonQa = [],
  handleQaDelete = (f) => f,
  handleQaEdit = (f) => f,
  handleAddAnswer = (f) => f,
  handleEditAnswer = (f) => f,
  handleDeleteAnswer = (f) => f,
  markdownCheetsheetModal,
  setMarkdownCheetsheetModal = (f) => f,
  markQaAsResolved = (f) => f,
  markQaAsNotResolved = (f) => f,
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
      {/* <hr style={{ borderTop: "3px dashed #f6f6f6" }} /> */}

      {!visible && (
        <div className="row pt-4">
          <Button
            onClick={() => setVisible(true)}
            className="col-md-6 offset-md-3 text-center"
            type="primary"
            shape="round"
            size="large"
          >
            Add A Question
          </Button>
        </div>
      )}
      {/* modal with form to create post */}
      <Modal
        title="Ask a question"
        width={720}
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div
          onClick={() => setMarkdownCheetsheetModal(!markdownCheetsheetModal)}
          className="text-center mb-4 pointer"
        >
          <b>Learn</b> to <i>write</i> in <code>markdown</code>
        </div>
        <MarkdownCheetsheet
          markdownCheetsheetModal={markdownCheetsheetModal}
          setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
        />
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            className="form-control square"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
            placeholder="Title"
            autoFocus
            required
          />

          <textarea
            className="form-control mt-3 mb-1"
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            value={values.description}
            rows="9"
            placeholder="Description"
          ></textarea>

          <Button
            onClick={handleCreatePost}
            className="col mt-2"
            size="large"
            type="primary"
            loading={values.loading}
            shape="round"
            disabled={values.loading || !values.title || !values.description}
          >
            {values.loading ? <SyncOutlined spin /> : "Submit"}
          </Button>
        </form>
      </Modal>

      {/* <pre>{JSON.stringify(clickedLessonQa, null, 4)}</pre> */}

      <div className="row pt-4">
        {clickedLessonQa.map((q) => (
          <div
            key={q._id}
            className="col-md-12 pt-2 pb-4 border-b-2 border-gray-100"
          >
            {/* {JSON.stringify(q)} */}

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
                {q.postedBy && user && user._id === q.postedBy._id ? (
                  <>
                    <span className="pt-1 ml-auto">
                      <Select defaultValue="select" style={{ width: 115 }}>
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
                ) : (
                  <>
                    <span className="pt-1 ml-auto">
                      <Select defaultValue="select" style={{ width: 115 }}>
                        <Option value="select">Select</Option>
                        <Option value="add">
                          <p onClick={() => handleAddAnswer(q)}>Add answer</p>
                        </Option>
                      </Select>
                    </span>
                  </>
                )}
              </div>

              <ReactMarkdown
                source={q.description}
                renderers={{ code: CodeBlock }}
                className="single-post pr-40"
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
                        <p> {new Date(q.createdAt).toLocaleDateString()}</p>

                        {a.postedBy &&
                          user &&
                          user._id === a.postedBy._id && [
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
                          ]}
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
                className="bg-gray-200 my-8 w-full text-dark border-solid border-2 border-light-blue-500 font-bold py-2 pr-3"
                onClick={() => handleAddAnswer(q)}
              >
                Add reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QaCreateRead;

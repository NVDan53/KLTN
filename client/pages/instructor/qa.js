import { useState, useEffect, useContext } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import Link from "next/link";
import { Modal } from "antd";
import {
  CheckOutlined,
  LoadingOutlined,
  IssuesCloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserQaReadRemove from "../../components/qa/UserQaReadRemove";
import CodeBlock from "../../components/marked/CodeBlock";
import MarkdownCheetsheet from "../../components/modal/MarkdownCheatsheet";
import QaEdit from "../../components/qa/QaEdit";
import AddAnswer from "../../components/qa/AddAnswer";
import EditAnswer from "../../components/qa/EditAnswer";
import { Context } from "../../context";

const InstructorQa = () => {
  // state
  const {
    state: { user, token },
  } = useContext(Context);
  // for qa
  const [qas, setQas] = useState([]);
  const [visible, setVisible] = useState(false);
  const [clickedLessonQa, setClickedLessonQa] = useState([]);
  // for qa update
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editValues, setEditValues] = useState({
    _id: "",
    title: "",
    description: "",
    loading: false,
  });
  // for adding answer
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});

  // for answer update
  const [answerEditModalVisible, setAnswerEditModalVisible] = useState(false);
  const [answerEditLoading, setAnswerEditLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState({});

  // markdown cheetsheet modal
  const [markdownCheetsheetModal, setMarkdownCheetsheetModal] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/instructor/qas",
      {
        headers: { Authorization: token },
      }
    );
    console.log("DATA ON LOAD_QUESTIONS => => ", data);
    setQas(data);
  };

  /**
   * =========================
   * QA
   * =========================
   */

  const handleQaDelete = async (q) => {
    try {
      let answer = confirm("Are you sure you want to delete?");
      // if (answer) console.log("handle qa delete", qaId);
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8000/api/qa/${q._id}/${q.postedBy}`,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("DELETED QA => ", data);
      loadQuestions();
    } catch (err) {
      toast("Delete failed. Try again.");
    }
  };

  const handleQaEdit = (q) => {
    // console.log("EDIT CLICKED =>", q);
    setEditValues(q);
    setEditModalVisible(!editModalVisible);
  };

  const handleEditPost = async () => {
    try {
      //   console.log("EDIT POST REQ => ", editValues);
      //   return;
      const { data } = await axios.put(
        `http://localhost:8000/api/user/qa/${editValues._id}`,
        editValues,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("EDIT POST RES => ", data);
      loadQuestions();
      setEditModalVisible(false);
      toast("Edit successful");
    } catch (err) {
      console.log(err);
      toast("Edit failed. Try again.");
    }
  };

  /**
   * add answer to qa
   */

  const handleAddAnswer = (q) => {
    setAnswerModalVisible(true);
    setCurrentQuestion(q);
  };

  const handleAnswerPost = async () => {
    // console.log("Q > ANSWER >> ", currentQuestion);
    // console.log("Q > CURRENT_CONTENT >> ", answerContent);
    // return;
    try {
      setAnswerLoading(true);
      const { data } = await axios.put(
        `http://localhost:8000/api/qa/answer`,
        {
          questionId: currentQuestion._id,
          content: answerContent,
          userId: user._id,
        },
        {
          headers: { Authorization: token },
        }
      );
      setAnswerContent("");
      setAnswerModalVisible(false);
      loadQuestions();
      setAnswerLoading(false);
      toast("New answer added");
      // console.log("ANSEWR ADDED =>", data);
    } catch (err) {
      console.log(err);
      setAnswerLoading(false);
      toast("Unauthorized");
    }
  };

  const handleEditAnswer = async (a) => {
    // console.log("handle edit ans qa", q._id, a._id);
    setAnswerEditModalVisible(true);
    setCurrentAnswer(a);
  };

  const handleEditAnswerPost = async () => {
    try {
      setAnswerEditLoading(true);
      // console.log("handleEditAnswerPost => currentanswer", currentAnswer);
      const { data } = await axios.put(
        `http://localhost:8000/api/qa/answer-edit`,
        currentAnswer,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("ANSWER EDIT RES", data);
      loadQuestions();
      setAnswerEditModalVisible(false);
      setCurrentAnswer({});
      setAnswerEditLoading(false);
      toast("Answer successfully updated");
    } catch (err) {
      toast("Error updating. Try again.");
      setAnswerEditLoading(false);
    }
  };

  const handleDeleteAnswer = async (a) => {
    // console.log("DELETE ANSWER a => ", a);
    // return;
    try {
      let answer = confirm("Are you sure you want to delete?");
      // if (answer) console.log("handle qa delete", qaId);
      if (!answer) return;
      // console.log("handle delete ans qa", a._id);
      const { data } = await axios.delete(
        `http://localhost:8000/api/qa/answer-delete/${a._id}/${a.postedBy._id}`,
        {
          headers: { Authorization: token },
        }
      );
      loadQuestions();
      toast("Answer successfully deleted");
    } catch (err) {
      toast("Delete failed. Try again.");
    }
  };

  const handleDeleteAnswerByInstructor = async (a) => {
    // console.log("DELETE ANSWER a => ", a);
    // return;
    try {
      let answer = confirm("Are you sure you want to delete?");
      // if (answer) console.log("handle qa delete", qaId);
      if (!answer) return;
      // console.log("handle delete ans qa", a._id);
      const { data } = await axios.delete(
        `http://localhost:8000/api/qa/answer-delete-by-instructor/${a._id}`,
        {
          headers: { Authorization: token },
        }
      );
      loadQuestions();
      toast("Answer successfully deleted");
    } catch (err) {
      toast("Delete failed. Try again.");
    }
  };

  const markQaAsResolved = async (q) => {
    try {
      //   console.log("QQQ markQaAsResolved => ", q);
      //   return;
      // console.log("mark as resolved", q._id, q.postedBy._id);
      const { data } = await axios.put(
        `http://localhost:8000/api/qa/mark-resolved`,
        {
          questionId: q._id,
          postedBy: q.postedBy,
        },
        {
          headers: { Authorization: token },
        }
      );
      loadQuestions();
      //   console.log("MARK RESOLVED => ", data);
      toast("You marked it resolved");
    } catch (err) {
      // console.log(err);
      toast("Mark resolved failed. Try again.");
    }
  };

  const markQaAsNotResolved = async (q) => {
    try {
      //   console.log("QQQ markQaAsNotResolved => ", q);
      //   return;
      const { data } = await axios.put(
        `http://localhost:8000/api/qa/mark-unresolved`,
        {
          questionId: q._id,
          postedBy: q.postedBy,
        },
        {
          headers: { Authorization: token },
        }
      );
      loadQuestions();
      //   console.log("MARK RESOLVED => ", data);
      toast("You marked it resolved");
    } catch (err) {
      // console.log(err);
      toast("Mark resolved failed. Try again.");
    }
  };

  /**
   * BY INSTRUCTOR
   */
  const handleQaDeleteByInstructor = async (q) => {
    try {
      let answer = confirm("Are you sure you want to delete?");
      // if (answer) console.log("handle qa delete", qaId);
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8000/api/qa-by-instructor/${q._id}`,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("DELETED QA => ", data);
      loadQuestions();
    } catch (err) {
      toast("Delete failed. Try again.");
    }
  };

  const markQaAsResolvedByInstructor = async (q) => {
    try {
      //   console.log("QQQ markQaAsResolved => ", q);
      //   return;
      // console.log("mark as resolved", q._id, q.postedBy._id);
      const { data } = await axios.put(
        `http://localhost:8000/api/qa/mark-resolved-by-instructor`,
        {
          questionId: q._id,
        },
        {
          headers: { Authorization: token },
        }
      );
      loadQuestions();
      //   console.log("MARK RESOLVED => ", data);
      toast("You marked it resolved");
    } catch (err) {
      // console.log(err);
      toast("Mark resolved failed. Try again.");
    }
  };

  const markQaAsNotResolvedByInstructor = async (q) => {
    try {
      //   console.log("QQQ markQaAsNotResolved => ", q);
      //   return;
      const { data } = await axios.put(
        `http://localhost:8000/api/qa/mark-unresolved-by-instructor`,
        {
          questionId: q._id,
        },
        {
          headers: { Authorization: token },
        }
      );
      loadQuestions();
      //   console.log("MARK RESOLVED => ", data);
      toast("You marked it resolved");
    } catch (err) {
      // console.log(err);
      toast("Mark resolved failed. Try again.");
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
          <li>Comment of user</li>
        </ul>
      </div>

      {/* <div className="lead alert alert-primary mt-2">Your posts</div> */}
      {/* read remove */}
      <UserQaReadRemove
        visible={visible}
        setVisible={setVisible}
        qas={qas} // instead of clicked lesson, its loading in useEffect
        handleQaDelete={handleQaDelete}
        handleQaEdit={handleQaEdit}
        handleAddAnswer={handleAddAnswer}
        handleEditAnswer={handleEditAnswer}
        handleDeleteAnswer={handleDeleteAnswer}
        handleDeleteAnswerByInstructor={handleDeleteAnswerByInstructor}
        handleQaDeleteByInstructor={handleQaDeleteByInstructor}
        markdownCheetsheetModal={markdownCheetsheetModal}
        setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
        markQaAsResolved={markQaAsResolved}
        markQaAsNotResolved={markQaAsNotResolved}
        markQaAsResolvedByInstructor={markQaAsResolvedByInstructor}
        markQaAsNotResolvedByInstructor={markQaAsNotResolvedByInstructor}
        instructor={true}
      />
      {/* edit in modal view */}
      <QaEdit
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        editValues={editValues}
        setEditValues={setEditValues}
        handleEditPost={handleEditPost}
        answerLoading={answerLoading}
        markdownCheetsheetModal={markdownCheetsheetModal}
        setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
      />
      {/* add answer */}
      <AddAnswer
        answerModalVisible={answerModalVisible}
        setAnswerModalVisible={setAnswerModalVisible}
        answerContent={answerContent}
        setAnswerContent={setAnswerContent}
        handleAnswerPost={handleAnswerPost}
        answerLoading={answerLoading}
        setAnswerLoading={setAnswerLoading}
        currentQuestion={currentQuestion}
        markdownCheetsheetModal={markdownCheetsheetModal}
        setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
      />
      {/* edit answer */}
      <EditAnswer
        answerEditModalVisible={answerEditModalVisible}
        setAnswerEditModalVisible={setAnswerEditModalVisible}
        handleEditAnswerPost={handleEditAnswerPost}
        answerEditLoading={answerEditLoading}
        setAnswerEditLoading={setAnswerEditLoading}
        currentAnswer={currentAnswer}
        setCurrentAnswer={setCurrentAnswer}
        markdownCheetsheetModal={markdownCheetsheetModal}
        setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
      />
    </InstructorRoute>
  );
};

export default InstructorQa;

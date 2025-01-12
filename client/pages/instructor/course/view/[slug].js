import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Avatar, Tooltip, Button, Modal, List } from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import ReactMarkdown from 'react-markdown';
import AddLessonForm from '../../../../components/forms/AddLessonForm';
import { toast } from 'react-toastify';
import { Badge } from 'antd';

import { Context } from '../../../../context';

const { Item } = List;

const CourseView = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState('Upload video');
  const [progress, setProgress] = useState(0);
  // values
  const [values, setValues] = useState({
    title: '',
    content: '',
    video: {},
  });
  const [students, setStudents] = useState(0);
  // markdown cheetsheet modal
  const [markdownCheetsheetModal, setMarkdownCheetsheetModal] = useState(false);

  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem('token'));
    }
  });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem('token'));
    setToken(tokenStorage);
  }, []);

  useEffect(() => {
    // console.log(slug);
    if (slug) fetchCourse();
  }, [slug, token]);

  useEffect(() => {
    course && studentCount();
  }, [course, token]);

  const fetchCourse = async () => {
    let { data } = await axios.get(
      `https://stress-apps.herokuapp.com/api/course/${slug}`
    );
    // console.log(data);
    setCourse(data);
  };

  const studentCount = async () => {
    const { data } = await axios.post(
      `https://stress-apps.herokuapp.com/api/instructor/student-count`,
      {
        courseId: course._id,
      },
      {
        headers: { Authorization: token },
      }
    );
    // console.log("STUDENT COUNT => ", data.length);
    setStudents(data.length);
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    // console.log("**SEND TO BACKEND**", course);
    // console.table({ values });
    let { data } = await axios.post(
      `https://stress-apps.herokuapp.com/api/course/lesson/${course._id}`,
      values,
      {
        headers: { Authorization: token },
      }
    );
    console.log('LESSON ADDED AND SAVED ===> ', data);
    setValues({ ...values, title: '', content: '', video: {} });
    setUploadButtonText('Upload video');
    setVisible(false);
    // push lessons to state then render
    setCourse(data);
    toast('Lesson added');
  };

  const handleVideo = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      setUploadButtonText(file.name);
      setUploading(true);
      // send video as form data
      const videoData = new FormData();
      videoData.append('video', file);
      videoData.append('courseId', course._id);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `https://stress-apps.herokuapp.com/api/course/upload-video/${course._id}`,
        videoData,
        {
          onUploadProgress: (e) =>
            setProgress(Math.round((100 * e.loaded) / e.total)),
        },
        {
          headers: { Authorization: token },
        }
      );
      // once response is received
      console.log(data);
      setValues({ ...values, video: data });
      setUploading(false);
      setProgress(0);
    } catch (err) {
      console.log(err);
      toast('Video upload failed');
    }
  };

  const handleVideoRemove = async () => {
    // remove video from s3
    const { data } = await axios.post(
      `https://stress-apps.herokuapp.com/api/course/remove-video/${course._id}`,
      values.video,
      {
        headers: { Authorization: token },
      }
    );
    console.log('remove uploaded video', data);
    setValues({ ...values, video: {} });
    setProgress(0);
    setUploading(false);
    setUploadButtonText('Upload another video');
  };

  const handlePublish = async () => {
    // console.log(course.instructor._id);
    // return;
    try {
      let answer = window.confirm(
        'Once you publish your course, it will be live in the marketplace for students to enroll.'
      );
      if (!answer) return;
      const { data } = await axios.put(
        `https://stress-apps.herokuapp.com/api/course/publish/${course._id}`,
        null,
        {
          headers: { Authorization: token },
        }
      );
      // console.log("COURSE PUBLISHED RES", data);
      toast('Congrats. Your course is now live in marketplace!');
      setCourse(data);
    } catch (err) {
      toast('Course publish failed. Try again');
    }
  };

  const handleUnpublish = async () => {
    // console.log(slug);
    // return;
    try {
      let answer = window.confirm(
        'Once you unpublish your course, it will not appear in the marketplace for students to enroll.'
      );
      if (!answer) return;
      const { data } = await axios.put(
        `https://stress-apps.herokuapp.com/api/course/unpublish/${course._id}`,
        null,
        {
          headers: { Authorization: token },
        }
      );
      toast('Your course is now removed from the marketplace!');
      setCourse(data);
    } catch (err) {
      toast('Course unpublish failed. Try again');
    }
  };

  return (
    <InstructorRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: '16px' }}
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
          <li>Add Lesson</li>
        </ul>
      </div>

      {course && (
        <div
          className="container-fluid"
          style={{ padding: '40px', backgroundColor: '#fff' }}
        >
          <div className="media items-center">
            <Avatar
              size={80}
              src={course.image ? course.image.Location : '/course.png'}
            />
            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <h5 className="mt-2 text-primary">{course.name}</h5>

                  <p>
                    {course.categories &&
                      course.categories.map((category) => (
                        <p key={category._id} style={{ color: 'red' }}>
                          {category.name}
                        </p>
                      ))}
                  </p>
                </div>

                <div className="d-flex">
                  {/* total students enrolled */}
                  <Tooltip title={`${students} Enrolled`}>
                    <UserSwitchOutlined className="h5 pointer text-success mr-4" />
                  </Tooltip>
                  {/* edit icon */}
                  <Tooltip title="Edit">
                    <EditOutlined
                      onClick={() =>
                        router.push(`/instructor/course/edit/${slug}`)
                      }
                      className="h5 pointer text-warning mr-4"
                    />
                  </Tooltip>
                  {/* course published ? unpublished */}
                  {course.lessons && course.lessons.length < 5 ? (
                    <Tooltip title="Min 5 lessons required to publish">
                      <QuestionOutlined className="h5 pointer text-danger mr-4" />
                    </Tooltip>
                  ) : course.published ? (
                    <Tooltip title="Unpublish">
                      <CloseOutlined
                        onClick={handleUnpublish}
                        className="h5 pointer text-danger"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Publish">
                      <CheckOutlined
                        onClick={handlePublish}
                        className="h5 pointer text-success"
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col my-4">
              <ReactMarkdown source={course.description} />
            </div>
          </div>

          <div className="row">
            <Button
              onClick={() => setVisible(true)}
              className="col-md-6 offset-md-3 text-center"
              type="primary"
              shape="round"
              icon={<UploadOutlined />}
              size="large"
            >
              Add Lesson
            </Button>
          </div>
          <Modal
            title="+ Add new"
            // width={720}
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={null}
          >
            <AddLessonForm
              values={values}
              setValues={setValues}
              handleAddLesson={handleAddLesson}
              uploading={uploading}
              uploadButtonText={uploadButtonText}
              handleVideo={handleVideo}
              progress={progress}
              handleVideoRemove={handleVideoRemove}
              markdownCheetsheetModal={markdownCheetsheetModal}
              setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
            />
          </Modal>

          {/* {JSON.stringify(course)} */}
          <div className="row pb-5">
            <div className="col lesson-list">
              <List
                itemLayout="horizontal"
                dataSource={course && course.lessons}
                renderItem={(item, index) => (
                  <Item>
                    <Item.Meta
                      avatar={
                        <Avatar style={{ backgroundColor: '#1890ff' }}>
                          {index + 1}
                        </Avatar>
                      }
                      title={item.title}
                    />
                  </Item>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </InstructorRoute>
  );
};

export default CourseView;

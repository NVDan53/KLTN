import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthorRoute from '../../../components/routes/AuthorRoute';
import { Select } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import MarkdownCheetsheet from '../../../components/modal/MarkdownCheatsheet';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../../components/marked/CodeBlock';
import Resizer from 'react-image-file-resizer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Context } from '../../../context';

const URL_DEPLOY = process.env.NEXT_PUBLIC_URL_DEPLOY;

const { Option } = Select;

const PostEdit = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [postId, setPostId] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [thumbnail, setThumbnail] = useState('');
  const [uploadButtonText, setUploadButtonText] = useState('Upload thumbnail');

  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(window.localStorage.getItem('token'));
    }
  });

  // markdown cheetsheet modal
  const [markdownCheetsheetModal, setMarkdownCheetsheetModal] = useState(false);
  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const tokenStorage = JSON.parse(window.localStorage.getItem('token'));
    setToken(tokenStorage);
  }, []);

  // functions
  useEffect(() => {
    loadPost();
  }, [slug, token]);

  useEffect(() => {
    loadCategories();
  }, [token]);

  const loadPost = async () => {
    try {
      const { data } = await axios.get(
        `https://stress-apps.herokuapp.com/api/post/${slug}`
      );
      console.log('SINGLE POST', data);
      setPostedBy(data.postedBy);
      setTitle(data.title);
      setBody(data.body);
      setPostId(data._id);
      // push category names
      let arr = [];
      data.categories.map((c) => arr.push(c.name));
      setCategories(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const loadCategories = async () => {
    const { data } = await axios.get(
      'https://stress-apps.herokuapp.com/api/categories',
      {
        headers: { Authorization: token },
      }
    );
    // console.log(data);
    setLoadedCategories(data);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleImage = (e) => {
    setUploading(true);
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    setUploadButtonText(file.name);

    Resizer.imageFileResizer(
      file, // file
      720, // maxWidth
      500, // maxHeight
      'JPEG', // compressionFormat
      100, // quality
      0, // rotation
      async (uri) => {
        // post to s3
        try {
          let { data } = await axios.post(
            'https://stress-apps.herokuapp.com/api/post/upload-image',
            {
              image: uri,
            },
            {
              headers: { Authorization: token },
            }
          );
          console.log('image uploaded', data);
          setBody(`${body} ![${file.name.replace(/\.[^/.]+$/, '')}](${data})`);
          // update local storage with image
          localStorage.setItem(
            'body',
            JSON.stringify(
              `${body} ![${file.name.replace(/\.[^/.]+$/, '')}](${data})`
            )
          );
          setThumbnail(data);
          setUploading(false);
        } catch (err) {
          setUploading(false);
          toast('Image upload failed. Try again.');
          console.log(err);
        }
      },
      'base64' // outputType
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `https://stress-apps.herokuapp.com/api/post/${slug}`,
        {
          postId,
          title,
          thumbnail,
          body,
          categories,
        },
        {
          headers: { Authorization: token },
        }
      );
      toast('Post updated');
      router.push('/author');
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <AuthorRoute>
      <h1 className="jumbotron text-center square p-3 mt-2 left-bottom-radius">
        Update Post
      </h1>

      <div className="row pb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control pb-2"
            value={title}
            onChange={handleTitle}
            placeholder="Write post title"
            autoFocus
            required
          />
          <div className="form-group mt-3">
            <label className="btn btn-light btn-block text-left p-5">
              {uploadButtonText}
              <input
                name="image"
                onChange={handleImage}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
          </div>
          <div
            onClick={() => setMarkdownCheetsheetModal(!markdownCheetsheetModal)}
            className="text-center mt-2 mb-2 pointer"
          >
            <b>Learn</b> to <i>write</i> in <code>markdown</code>
          </div>

          <textarea
            onChange={handleBody}
            value={body}
            placeholder="Write post content"
            className="form-control markdown-textarea"
            cols="20"
            rows="25"
            required
          ></textarea>

          <Select
            className="mt-3 mb-3"
            size="large"
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select category"
            value={categories}
            onChange={(value) => setCategories(value)}
          >
            {loadedCategories.map((c) => (
              <Option key={c.name} value={c.name}>
                {c.name}
              </Option>
            ))}
          </Select>
          {/* upload */}
          <label className="btn btn-primary">
            {uploading ? <SyncOutlined spin className="h4" /> : 'INSERT IMAGE'}
            <input onChange={handleImage} type="file" accept="image/*" hidden />
          </label>
          {/* save */}
          <button
            onClick={handleSave}
            className="btn btn-primary float-right"
            disabled={!title || !body || loading || uploading}
          >
            {loading ? <SyncOutlined spin className="h4" /> : 'UPDATE'}
          </button>
        </div>
        <div
          className="col-md-4 markdown-preview"
          style={{ maxHeight: '85vh', overflowY: 'scroll' }}
        >
          <p>Preview</p>
          <hr />
          <h1>{title}</h1>
          <hr />
          {/* <ReactMarkdown source={body} renderers={{ code: CodeBlock }} /> */}
          <ReactMarkdown source={body} renderers={{ code: CodeBlock }} />
        </div>
      </div>

      <MarkdownCheetsheet
        markdownCheetsheetModal={markdownCheetsheetModal}
        setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
        extra={true}
      />
    </AuthorRoute>
  );
};

export default PostEdit;

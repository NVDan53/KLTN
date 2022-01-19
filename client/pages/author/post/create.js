import { useEffect, useState } from "react";
import axios from "axios";
import AuthorRoute from "../../../components/routes/AuthorRoute";
import { Select } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import MarkdownCheetsheet from "../../../components/modal/MarkdownCheatsheet";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../../components/marked/CodeBlock";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const { Option } = Select;

const PostCreate = () => {
  // from localstorage
  const savedTitle = () => {
    if (process.browser) {
      if (localStorage.getItem("title"))
        return JSON.parse(localStorage.getItem("title"));
    }
  };

  const savedBody = () => {
    if (process.browser) {
      if (localStorage.getItem("body"))
        return JSON.parse(localStorage.getItem("body"));
    }
  };
  // local state
  const [title, setTitle] = useState(savedTitle());
  const [body, setBody] = useState(savedBody());
  const [categories, setCategories] = useState([]);
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [thumbnail, setThumbnail] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload thumbnail");

  // markdown cheetsheet modal
  const [markdownCheetsheetModal, setMarkdownCheetsheetModal] = useState(false);

  // router
  const router = useRouter();

  // functions
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await axios.get("/api/categories");
    // console.log(data);
    setLoadedCategories(data);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    localStorage.setItem("title", JSON.stringify(e.target.value));
  };

  const handleBody = (e) => {
    setBody(e.target.value);
    localStorage.setItem("body", JSON.stringify(e.target.value));
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
      "JPEG", // compressionFormat
      100, // quality
      0, // rotation
      async (uri) => {
        // post to s3
        try {
          let { data } = await axios.post("/api/post/upload-image", {
            image: uri,
          });
          console.log("image uploaded", data);
          setBody(`${body} ![${file.name.replace(/\.[^/.]+$/, "")}](${data})`);
          // update local storage with image
          localStorage.setItem(
            "body",
            JSON.stringify(
              `${body} ![${file.name.replace(/\.[^/.]+$/, "")}](${data})`
            )
          );
          setThumbnail(data);
          setUploading(false);
        } catch (err) {
          setUploading(false);
          toast("Image upload failed. Try again.");
          console.log(err);
        }
      },
      "base64" // outputType
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/post", {
        title,
        thumbnail,
        body,
        categories,
      });
      localStorage.removeItem("title");
      localStorage.removeItem("body");
      toast("Post published");
      router.push("/author");
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <AuthorRoute>
      <div
        className="text-blue-900 text-sm rounded-md"
        style={{ margin: "16px" }}
      >
        <ul className="flex">
          <li>
            <a href="#" className="underline font-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Create a post</li>
        </ul>
      </div>

      <div className="row pb-4 ml-0">
        <div className="col-md-8 ">
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
            style={{ width: "100%" }}
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
            {uploading ? <SyncOutlined spin className="h4" /> : "INSERT IMAGE"}
            <input onChange={handleImage} type="file" accept="image/*" hidden />
          </label>
          {/* save */}
          <button
            onClick={handleSave}
            className="btn btn-primary float-right"
            disabled={!title || !body || loading || uploading}
          >
            {loading ? <SyncOutlined spin className="h4" /> : "PUBLISH"}
          </button>
        </div>
        <div
          className="col-md-4 markdown-preview"
          style={{ maxHeight: "85vh", overflowY: "scroll" }}
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

export default PostCreate;

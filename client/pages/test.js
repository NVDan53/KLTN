import { useState, useEffect } from "react";
import Link from "next/link";

const AdminNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <>
     {/* <h1 className="jumbotron text-center square">...</h1> */}

     <div className="row">
        {users.map((user) => (
          <div key={user._id} className="col-md-12 pt-2 pb-4">
            <ul className="list-group text-dark">
              <li
                className={`list-group-item ${
                  user.stripe_seller
                    ? "bg-danger"
                    : user.courses && user.courses.length
                    ? "bg-warning"
                    : "bg-primary"
                } font-weight-bold text-white`}
              >
                {user.name}{" "}
                {user.stripeSession && (
                  <Tooltip title="Incomplete checkout">
                    <span className="float-right">
                      <WarningOutlined />
                    </span>
                  </Tooltip>
                )}
              </li>
              <li className="list-group-item">{user.email}</li>
              {/* <li className="list-group-item">
                Email verified {JSON.stringify(user.email_verified)}
              </li> */}
              <li className="list-group-item">
                Role {JSON.stringify(user.role)}
              </li>
              {user.stripe_account_id && (
                <li className="list-group-item">{user.stripe_account_id}</li>
              )}
              <li className="list-group-item">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </li>
              <li className="list-group-item">
                Late updated {new Date(user.updatedAt).toLocaleDateString()}
              </li>
              {/* courses */}
              {user.courses && user.courses.length >= 1 && (
                <li
                  className="list-group-item bg-light"
                  style={{ height: "200px", overflow: "scroll" }}
                >
                  <p>courses</p>
                  <hr />
                  <pre>{JSON.stringify(user.courses, null, 4)}</pre>
                </li>
              )}
              {/* stripe_seller */}
              {user.stripe_seller && (
                <li
                  className="list-group-item bg-light"
                  style={{ height: "200px", overflow: "scroll" }}
                >
                  <p>stripe_seller</p>
                  <hr />
                  <pre>{JSON.stringify(user.stripe_seller, null, 4)}</pre>
                </li>
              )}
              {/* stripeSession */}
              {user.stripeSession && (
                <li
                  className="list-group-item"
                  style={{ height: "200px", overflow: "scroll" }}
                >
                  <p>stripeSession</p>
                  <hr />
                  <pre>{JSON.stringify(user.stripeSession, null, 4)}</pre>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>









      <AdminRoute>
      {/* <h1 className="jumbotron text-center square">Instructor</h1> */}

      {posts &&
        posts.map((post, index) => (
          <div className="media pt-2 pb-1" key={post._id}>
            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <Link href={`/article/${post.slug}`} className="pointer">
                    <a>
                      <h5 className="mt-2 text-primary">
                        <Avatar>{index + 1}</Avatar> {post.title}
                      </h5>
                    </a>
                  </Link>
                </div>

                {/* published? */}
                <div className="mt-3 float-right pr-2">
                  {post.published ? (
                    <>
                      <Tooltip title="Unpublish">
                        <CloseCircleOutlined
                          onClick={() => handleUnpublish(post)}
                          className="h5 text-warning pr-2 pl-2"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          onClick={() => handleDelete(post)}
                          className="h5 text-danger pointer pr-2 pl-2"
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Publish">
                        <CheckCircleOutlined
                          onClick={() => handlePublish(post)}
                          className="h5 text-success pr-2 pl-2"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          onClick={() => handleDelete(post)}
                          className="h5 text-danger pointer pr-2 pl-2"
                        />
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      <br />
    </AdminRoute>
    </>



  );
};

export default AdminNav;

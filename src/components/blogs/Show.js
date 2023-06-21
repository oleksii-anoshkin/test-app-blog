import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/Show.css";
import fb from "../Firebase";

const db = fb.firestore();
const Blogs = db.collection("blogs");

export default function Show() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [blogIds, setBlogIds] = useState([]);

  Blogs.doc(id)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      setBlog(data);
    });

  useEffect(() => {
    const unsubscribe = Blogs.limit(100).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.id);
      setBlogIds(data);
    });

    return unsubscribe;
  }, []);

  const body = blog.body;
  const prevId =
    blogIds[blogIds.indexOf(id) - 1 > 0 ? blogIds.indexOf(id) - 1 : 0];
  const nextId =
    blogIds[
      blogIds.indexOf(id) + 1 < blogIds.length - 1
        ? blogIds.indexOf(id) + 1
        : blogIds.length - 1
    ];

  return (
    <section>
      <article className="show d-flex align-items-stretch">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: body,
              }}></p>
            <div className="btn__box">
              <Link to={"/edit/" + id} className="btn btn-secondary">
                Edit
              </Link>
              <Link to={"/show/" + prevId} className="btn btn-secondary">
                Previous
              </Link>
              <Link to={"/show/" + nextId} className="btn btn-secondary">
                Next
              </Link>
              <Link to="/" className="btn btn-secondary">
                Home
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

import "../css/BlogList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fb from "./Firebase";

const db = fb.firestore();
const Blogs = db.collection("blogs");
const maxLength = 500;

export default function BlogList() {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    const unsubscribe = Blogs.limit(100).onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogsList(data);
    });

    return unsubscribe;
  }, []);

  function Delete(id) {
    Blogs.doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        console.log("Error removing document: ", error);
      });
  }

  return (
    <section>
      <h2 className="blogs__title">
        All Blogs List <span className="badge bg-secondary">News</span>
      </h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {blogsList.map((blog) => (
          <article className="col d-flex align-items-stretch" key={blog.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{
                    __html: `${blog.body.substring(0, maxLength)}...`,
                  }}></p>
                <div className="btn__box">
                  <Link to={"/show/" + blog.id} className="btn btn-secondary">
                    View
                  </Link>
                  <Link
                    to={"/edit/" + blog.id}
                    className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      Delete(blog.id);
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

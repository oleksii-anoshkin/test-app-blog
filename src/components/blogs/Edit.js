import { useState } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import fb from "../Firebase";

const db = fb.firestore();
const Blogs = db.collection("blogs");

export default function Edit() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [change, setChange] = useState(true);

  if (change) {
    Blogs.doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        setTitle(data.title);
        setBody(data.body);
        setChange(false);
      });
  }

  function Submit(e) {
    e.preventDefault();

    Blogs.doc(id)
      .update({
        title: title,
        body: body,
      })
      .then((docRef) => {
        alert("Data Successfully Updated!");
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
  }

  return (
    <section>
      <form onSubmit={Submit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Blog title
          </label>
          <input
            value={title}
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="write blog title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Blog text
          </label>
          <Editor
            className="form-control"
            id="exampleFormControlTextarea1"
            textareaName="Body"
            initialValue={body}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "image",
                "code",
                "table",
                "link",
                "media",
                "codesample",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newText) => setBody(newText)}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
        <button type="reset" className="btn btn-secondary">
          Clear
        </button>
        <Link to="/" className="btn btn-secondary">
          Home
        </Link>
      </form>
    </section>
  );
}

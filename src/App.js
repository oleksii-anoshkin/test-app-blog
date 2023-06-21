import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/blogs/create";
import BlogList from "./components/BlogList";
import Show from "./components/blogs/Show";
import Edit from "./components/blogs/Edit";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container-fluid">
        <Routes>
          <Route exact path="/" element={<BlogList />}></Route>
          <Route path="/create/" element={<Create />}></Route>
          <Route path="/show/:id" element={<Show />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

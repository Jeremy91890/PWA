import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Images from "./pages/Images";
import Videos from "./pages/Videos";
import { ImagesFromPublic } from "./pages/ImagesFromPublic";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/images">Images</Link>
          <Link to="/images-public">Images-public</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/users">Users</Link>
        </nav>
        <Routes>
          <Route path="/images" element={<Images />} />
          <Route path="/images-public" element={<ImagesFromPublic />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

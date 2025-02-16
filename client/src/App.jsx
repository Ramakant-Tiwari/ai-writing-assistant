import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router"; // Correct module name
import Navbar from "./components/Navbar";
import PrivateRoutes from "./components/PrivateRoutes";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Editor = lazy(() => import("./components/Editor"));
const Login = lazy(() => import("./components/Login"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Kept non-lazy */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="write"
            element={
              <PrivateRoutes>
                <Editor />
              </PrivateRoutes>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

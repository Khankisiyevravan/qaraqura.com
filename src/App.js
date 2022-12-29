import "./App.css";
import Homepage from "./views/Homepage";
import Contact from "./views/Contact";
import { Routes, Route, useLocation } from "react-router-dom";
import Galery from "./views/Galery";
import About from "./views/About";
import Details from "./components/Details";
import Modal from "./components/Modal";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import { connect } from "react-redux";
import "aos/dist/aos.css";
import { useEffect } from "react";
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <div className="App">
      <Header />
      <Modal />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/galery" element={<Galery />} />
        <Route path="/galery/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default connect()(App);

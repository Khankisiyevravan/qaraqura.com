import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRef } from "react";
function Homepage() {
  AOS.init();
  const [galeries, setGaleries] = useState([]);
  const [general, setGeneral] = useState([]);
  const [count, setCount] = useState(0);
  const generalRef = useRef();
  useEffect(() => {
    const getGalery = async () => {
      let data = await fetch("https://admin.qaraqura.com/post_list/").then(
        (a) => a.json()
      );
      setGaleries(data.sort((a, b) => -1).slice(0, 12));
    };
    getGalery();
    const generalSettings = async () => {
      let data = await fetch("https://admin.qaraqura.com/general_set/").then(
        (a) => a.json()
      );
      setGeneral(data);
    };
    generalSettings();
  }, []);
  const hoverEffect = (e) => {
    console.log("salam");
    const videoTag = e.target.closest("div").querySelector("video");
    if (count < 1) {
      videoTag.style.opacity = "1"
      videoTag.currentTime = "0"
      videoTag.play();
    }
    setCount(count + 1);
  };
  useEffect(() => {
    if (general[0]) {
      generalRef.current.innerHTML = general[0]?.header_text
    }
  }, [general])
  return (
    <>
      <section id="home-head-text">
        <div className="container">
          <h2 ref={generalRef}>
            
          </h2>

          <div id="video">
            <a href="#galery-section" onMouseMove={(e) => hoverEffect(e)} onMouseLeave={(e) => {
              e.target.closest("div").querySelector("video").style.opacity = "0";
              setCount(0)
            }}>
              Davam et
            </a>
            <video
              id="arrow-swirly-video"
              src="/videos/arrow-swirly2.mp4"
              muted="muted"
            ></video>
          </div>
        </div>
      </section>
      <section id="galery-section">
        <div className="container">
          <div id="galery-section-head">
            <h6>Qalereya</h6>
            <Link to="/galery">
              Hamısına bax <img src="./images/oval-black.png" alt="" />
            </Link>
          </div>
          <div id="galery-items">
            {galeries.map((galery, index) => (
              <Link
                key={index}
                to={`/galery/${galery.id}`}
                className="galery-item"
              >
                <div style={{ backgroundImage: `url(${galery.image})` }}></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Homepage;

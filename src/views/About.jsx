import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
function About() {
  const [instructors, setInstuctors] = useState([]);
  const [aboutHeaders, setAboutHeaders] = useState([]);
  const [aboutHeaders2, setAboutHeaders2] = useState([]);
  const [aboutMain, setAboutMain] = useState([]);
  const aboutMainRef = useRef();
  useEffect(() => {
    // about_header +
    // about_header_2 +
    // about_main ++++
    // create_post +
    //api
    // post_list +
    // instructor_list +
    const getDataAboutMain = async () => {
      let data = await fetch("https://admin.qaraqura.com/about_main/").then((a) =>
        a.json()
      );
      setAboutMain(data);
    };
    getDataAboutMain();
    const getDataAboutHeader2 = async () => {
      let data = await fetch("https://admin.qaraqura.com/about_header_2/").then((a) =>
        a.json()
      );
      console.log(data);
      setAboutHeaders2(data);
    };
    getDataAboutHeader2();
    const getDataAboutHeader = async () => {
      let data = await fetch("https://admin.qaraqura.com/about_header/").then((a) =>
        a.json()
      );
      setAboutHeaders(data);
    };
    getDataAboutHeader();
    const getInstructorData = async () => {
      let data = await fetch("https://admin.qaraqura.com/instructor_list/").then((a) =>
        a.json()
      );
      setInstuctors(data);
    };
    getInstructorData();
  }, []);
  
  useEffect(() => {
    aboutMainRef.current.querySelector(".about-head-text span").innerHTML = aboutMain[0]?.title_1_little
    aboutMainRef.current.querySelector(".about-head-text h2").innerHTML = aboutMain[0]?.title_1
  }, [aboutMain])
  return (
    <div ref={aboutMainRef}>
      <section className="about-head-text">
        <div className="container">
          <span></span>
          <h2></h2>
        </div>
      </section>
      <section id="about-cards">
        <div className="container">
          {aboutHeaders.map((aboutHeader, index) => (
            <div className="about-card" key={index}>
              <h6>{aboutHeader.header}</h6>
              <p>{aboutHeader.content}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-head-text">
        <div className="container">
          <h2>{aboutMain[0]?.title_2}</h2>
        </div>
      </section>
      <section id="circle-cards">
        <div className="container">
          
          {aboutHeaders2.map((aboutHeader2, index) => (
            <div key={index} className="circle-card">
              <div className="circle-card-image">
                <img src="/images/circle69x70-black.png" alt="" />
              </div>
              <p>{aboutHeader2.content}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="we-recognize">
        <div className="container">
          <div id="we-recognize-head"></div>
          <div id="workers">
            {instructors.map((instructor) => (
              <div className="worker">
                <div className="worker-image">
                  <img src={instructor.image} alt="" />
                </div>
                <div className="worker-text">
                  <span className="worker-name">
                    {instructor.name} {instructor.surname}
                  </span>
                  <span className="worker-position">{instructor.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;

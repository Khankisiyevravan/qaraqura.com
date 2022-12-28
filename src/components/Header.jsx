import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
function Header(props) {
  const [active, setActive] = useState(false);
  const burger = () => {
    setActive(!active);
  };
  const [general, setGeneral] = useState([]);
  useEffect(() => {
    const generalSettings = async () => {
      let data = await fetch("https://admin.qaraqura.com/general_set/").then(
        (a) => a.json()
      );
      setGeneral(data);
    };
    generalSettings();
  }, []);
  useEffect(() => {
    if (active) {
      props.dispatch({
        type: "Show_Burger",
      });
    } else {
      props.dispatch({
        type: "Hidden_Burger",
      });
    }
  }, [active]);
  useEffect(() => {
    if (props.burgerShowR) {
      burgerLogoRef.current.setAttribute(
        "src",
        "/images/X.svg"
      );
      document.body.style.overflow = "hidden";
      burgerMenuRef.current.classList.add("active");
    } else {
      burgerLogoRef.current.setAttribute(
        "src",
        "/images/menu.svg"
      );
      burgerMenuRef.current.classList.remove("active");
      if (!props.uploadShowR) document.body.style.overflow = "auto";
    }
  }, [props.burgerShowR]);
  const burgerMenuRef = useRef();
  const burgerLogoRef = useRef();
  const location = useLocation();
  useEffect(() => {
    [...burgerMenuRef.current.querySelectorAll("ul li a")].map((li) => {
      return li.getAttribute("href") === location.pathname
        ? li.setAttribute("className", "actived")
        : li.setAttribute("className", " ");
    });
  }, [location]);
  const showModal = (e) => {
    e.preventDefault();
    props.dispatch({
      type: "Show_Upload",
    });
  };
  const navlink = () => {
    props.dispatch({
      type: "Hidden_Burger",
    });
    setActive(!active);
  };
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <img src={general[0]?.logo} alt="" />
        </Link>
        <div id="header-right">
          <Link onClick={(e) => showModal(e)} to="/">
            <div className="plus">
              <img src="/images/group825.svg" alt="" />
              {/* <img src="/images/circle-black.png" alt="" />
              <img src="/images/plus-black.png" alt="" /> */}
            </div>
            <span>Qara-quranı yüklə</span>
          </Link>
          <div id="burger-menu-logo" onClick={(e) => burger(e)}>
            <img
              ref={burgerLogoRef}
              src="/images/menu.svg"
              alt=""
            />
          </div>
          <div ref={burgerMenuRef} className="ii" id="burger-menu">
            <ul className="container">
              <li>
                <Link to="/" onClick={() => navlink()}>
                  <span>01</span>
                  <span>Ana səhifə</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => navlink()}>
                  <span>02</span>
                  <span>Haqqımızda</span>
                </Link>
              </li>
              <li>
                <Link to="/galery" onClick={() => navlink()}>
                  <span>03</span>
                  <span>Qalereya</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => navlink()}>
                  <span>04</span>
                  <span>Əlaqə</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
const b = (a) => a;
export default connect(b)(Header);

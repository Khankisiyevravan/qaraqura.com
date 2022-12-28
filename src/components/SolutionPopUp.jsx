import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
function SolutionPopUp(props) {
  const solutionPopUpRef = useRef();
  const show = props.solutionPopUp;
  const [imageSrc, setImageSrc] = useState("");
  const [index, setIndex] = useState("");
  const solutionList = props.solutionList;
  useEffect(() => {
    setIndex(index);
    // console.log(props.index);

    if (show) {
      // console.log(show);
      solutionPopUpRef.current.style.transform = "translateY(0)";
      document.body.style.overflow = "hidden";
      setImageSrc(props.solutionItem.image);
    } else {
      solutionPopUpRef.current.style.transform = "translateY(-100%)";
      document.body.style.overflow = "auto";
    }
  }, [show]);
  useEffect(() => {
    // console.log(index);
    setImageSrc(solutionList[index]?.image);
  }, [index]);
  const nextSolutionItem = () => {
    if (Number(index) + 1 < solutionList.length) setIndex(Number(index) + 1);
  };
  const prevSolutionItem = () => {
    if (Number(index) - 1 >= 0) setIndex(Number(index) - 1);
  };
  return (
    <div ref={solutionPopUpRef} className="solutionPopUp">
      <div
        className="close-thanks"
        onClick={() =>
          props.dispatch({
            type: "Hidden_Details_PopUp",
          })
        }
      >
        <img src="/images/x-white.svg" alt="" />
      </div>
      <div className="solutionItem">
        <img src={imageSrc} alt="" />
        <div id="solutionPagination">
          <div id="prevSolution" onClick={() => prevSolutionItem()}>
            <img src="/images/prev-white.svg" alt="" />
          </div>
          <div id="nextSolution" onClick={() => nextSolutionItem()}>
            <img src="/images/next-white.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
const a = (b) => b;
export default connect(a)(SolutionPopUp);

import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
function Thanks(props) {
  const modalThanks = useRef();
  useEffect(() => {
    if (props.thanksShowR) {
      props.dispatch({
        type: "Hidden_Upload",
      });
      props.dispatch({
        type:"Hidden_Upload_Solution"
      })
      document.body.style.overflow = "hidden";
      modalThanks.current.style.transform = "translateY(0%)";
    } else {
      document.body.style.overflow = "auto";
      modalThanks.current.style.transform = "translateY(-100%)";
    }
  }, [props.thanksShowR]);
  return (
    <section ref={modalThanks} id="thanks-popup">
      <div
        className="close-thanks"
        onClick={() =>
          props.dispatch({
            type: "Hidden_Thanks",
          })
        }
      >
        <img src="/images/burger-open-black.png" alt="" />
      </div>
      <div>
        <img src="/images/smile-image.png" alt="" />
      </div>
      <div id="thanks-text">
        <h4>Təşəkkürlər</h4>
        <p>
          Göndərdiyiniz fayl qeydə alındı. Göndərdiyiniz fayl məqsədlərimizə
          uyğun olsa, yaxın zamanda sayta yer alacaqdır.
        </p>
      </div>
    </section>
  );
}
const b = (a) => a;
export default connect(b)(Thanks);

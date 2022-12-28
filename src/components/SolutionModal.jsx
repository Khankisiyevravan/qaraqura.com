import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
function SolutionModal(props) {
  // console.log(props);
  const [loading, setLoading] = useState(false);
  const hiddenModal = () => {
    props.dispatch({
      type: "Hidden_Upload_Solution",
    });
    modalUploadSolution.current.style.transitionDelay = "0s";
  };
  AOS.init();
  const modalUploadSolution = useRef();
  const [x, setX] = useState("");
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (props.uploadSolutionShowR) {
      if (props.burgerShowR) {
        props.dispatch({
          type: "Hidden_Burger",
        });
        modalUploadSolution.current.style.transitionDelay = "0.8s";
      }
      document.body.style.overflow = "hidden";
      modalUploadSolution.current.style.transform = "translateY(0)";
    } else {
      document.body.style.overflow = "auto";
      modalUploadSolution.current.style.transform = "translateY(-100%)";
    }
    if (props.uploadSolutionShowR || props.burgerShowR) {
      document.body.style.overflow = "hidden";
    }
  }, [props.uploadSolutionShowR]);
  const handleUploadSolution = (e) => {
    console.log(e.target);
    setItems([...e.target.files]);
    setProducts(e.target.files);
  };

  const submitButton = (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", products[0]);
    formData.append("product", props.id);
    e.preventDefault();
    fetch("https://admin.qaraqura.com/create_solution/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        props.dispatch({
          type: "Show_Thanks",
        });
        setLoading(false);
      })
      .catch((error) => console.log(error, "error"));
    console.log(formData);
  };

  const previewDiv = useRef();
  const preview = (e, index) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setX(reader.result);
    });
    reader.readAsDataURL(products[index]);

    previewDiv.current.style.transform = "scale(1)";
  };
  const previewDisabled = (e) => {
    previewDiv.current.style.transform = "scale(0)";
  };
  useEffect(() => {
    let image = previewDiv.current.querySelector("img");
    if (image.naturalHeight < image.naturalWidth) {
      image.classList.add("vertical-preview");
    } else {
      image.classList.remove("vertical");
    }
  }, [x]);
  return (
    <>
      {loading ? <Loading /> : ""}
      <section id="upload-file-section" ref={modalUploadSolution}>
        <div id="preview-image" ref={previewDiv}>
          <button onClick={(e) => previewDisabled(e)}>X</button>
          <img src={x} alt="" />
        </div>
        <div id="upload-head" data-aos="fade-down" data-aos-duration="2000">
          {/* <h4 id="upload-file-section-head">Müvafiq sənədləri seçin</h4> */}
          <div id="upload-file-process">
            <div id="upload-icon">
              <img src="/images/upload-icon.png" alt="" />
            </div>
            <div id="upload-text">
              <p>Faylı seçin və ya sürüşdürüb gətirin.</p>
              <span>15MB-dan artıq olmayan JPG, PNG və ya PDF </span>
            </div>
            <div id="upload-div">
              <input
                name="image"
                id="uploadd"
                onChange={(e) => handleUploadSolution(e)}
                type="file"
              />
              <label htmlFor="uploadd">FAYLI SEÇİNI</label>
            </div>
          </div>

          <div id="upload-files-div">
            <h5>Əlavə olunmuş fayllar</h5>
            <div id="upload-files">
              {items?.map((p, index) => (
                <div key={index} className="upload-file">
                  <div className="upload-file-detail">
                    <div className="upload-file-icon">
                      <i className="fa-solid fa-file-image"></i>
                    </div>
                    <span>{p.name}</span>
                    <span onClick={(e) => preview(e, index)}>Önbaxış</span>
                  </div>
                  <div className="upload-file-size">
                    {`${Math.round(p.size / 1024)}`} KB
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="upload-bottom">
          <div className="container">
            <button onClick={() => hiddenModal()} className="btn2">
              Imtina Et
            </button>
            <button onClick={submitButton} className="btn2 hover">
              Yüklə
            </button>
          </div>
        </div>
      </section>
      ;
    </>
  );
}
const a = (b) => b;
export default connect(a)(SolutionModal);

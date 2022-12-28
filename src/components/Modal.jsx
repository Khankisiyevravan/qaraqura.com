import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState ,useRef,useEffect } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import Thanks from "./Thanks";
function Modal(props) {
  const [loading, setLoading] = useState(false);
  const hiddenModal = () => {
    props.dispatch({
      type: "Hidden_Upload",
    });
    modalUpload.current.style.transitionDelay = "0s";
  };
  AOS.init();
  const modalUpload = useRef();
  const [x, setX] = useState("");
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (props.uploadShowR) {
      if (props.burgerShowR) {
        props.dispatch({
          type: "Hidden_Burger",
        });
        modalUpload.current.style.transitionDelay = "0.8s";
      }
      document.body.style.overflow = "hidden";
      modalUpload.current.style.transform = "translateY(0)";
    } else {
      document.body.style.overflow = "auto";
      modalUpload.current.style.transform = "translateY(-100%)";
    }
    if (props.uploadShowR || props.burgerShowR) {
      document.body.style.overflow = "hidden";
    }
  }, [props.uploadShowR]);

  const handleUpload = (e) => {
    console.log(e.target);
    setItems([...e.target.files]);
    setProducts(e.target.files);
  };
  const submitButton = (e) => {
    setLoading(true);
    console.log(products.length);
    let formData = new FormData();
    for (let i = 0; i < products.length; i++) {
      formData.append("document", products[i]);
    }

    e.preventDefault();
    fetch("https://admin.qaraqura.com/create_post/", {
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
  };

  const previewDiv = useRef();
  const preview = (e, index) => {
    // setX(itemsReaders[index]);
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
    
    if (image?.naturalHeight < image?.naturalWidth) {
      image.classList.add("vertical-preview");
      
    } else {
      image.classList.remove("vertical-preview");
    }
  }, [x]);
  return (
    <>
      <Thanks />

      {loading ? <Loading /> : ""}
      <section id="upload-file-section" ref={modalUpload}>
        <div id="preview-image" ref={previewDiv}>
          <button onClick={(e) => previewDisabled(e)}>X</button>
          <img src={x} alt="" />
        </div>
        <div id="upload-head" data-aos="fade-down" data-aos-duration="2000">
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
                id="upload"
                onChange={handleUpload}
                type="file"
                multiple
              />
              <label htmlFor="upload">FAYLI SEÇİN</label>
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

              {/* <div className="upload-file">
                <div className="upload-file-detail">
                  <div className="upload-file-icon">
                    <i className="fa-solid fa-file-image"></i>
                  </div>
                  <span>Şəkil.01</span>
                  <span>Önbaxış</span>
                </div>
                <div className="upload-file-size">5.7MB</div>
              </div> */}
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

      {/* <section>
        {all.map((a) => (
          <div>
            <img src={a.image} alt="" />
          </div>
        ))}
      </section> */}
    </>
  );
}
const b = (a) => a;
export default connect(b)(Modal);

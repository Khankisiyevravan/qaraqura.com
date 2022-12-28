import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
function Galery() {
  const [galeries, setGaleries] = useState([]);
  const [showProductsNumber, setShowProductsNumber] = useState(12);
  useEffect(() => {
    const getGalery = async () => {
      let data = await fetch("https://admin.qaraqura.com/post_list/").then(
        (a) => a.json()
      );
      console.log(data);
      
      setGaleries(data.sort((a, b) => -1));
    };
    getGalery();
  }, []);

  const addShowProducts = (e) => {
    console.log(showProductsNumber);
    if (showProductsNumber === galeries.length) return;
    const galeryItems = e.target
      .closest(".container")
      .querySelector("#galery-items");

    console.log(galeryItems);
    if (window.innerWidth <= 500) {
      if (galeries.length - showProductsNumber > 2) {
        setShowProductsNumber(showProductsNumber + 2);
        galeryItems.style.height = `${Math.ceil((showProductsNumber + 2) / 2) * 200
          }px`;
      } else {
        setShowProductsNumber(galeries.length);
        galeryItems.style.height = `${Math.ceil(galeries.length / 2) * 200}px`;
      }
    } else if (window.innerWidth < 768 && window.innerWidth > 500) {
      if (galeries.length - showProductsNumber > 3) {
        setShowProductsNumber(showProductsNumber + 3);
        console.log(showProductsNumber);
        galeryItems.style.height = `${Math.ceil(showProductsNumber / 3) * 230 - 20
          }px`;
      } else {
        setShowProductsNumber(galeries.length);
        galeryItems.style.height = `${Math.ceil(galeries.length / 3) * 230 - 20
          }px`;
      }
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
      if (galeries.length - showProductsNumber > 4) {
        setShowProductsNumber(showProductsNumber + 4);
        galeryItems.style.height = `${Math.ceil((showProductsNumber + 4) / 4) * 260 - 10
          }px`;
      } else {
        setShowProductsNumber(galeries.length);
        galeryItems.style.height = `${Math.ceil(galeries.length / 4) * 260 - 10
          }px`;
      }
    } else if (window.innerWidth > 1024) {
      if (galeries.length - showProductsNumber > 4) {
        setShowProductsNumber(showProductsNumber + 4);
        galeryItems.style.height = `${Math.ceil((showProductsNumber + 4) / 4) * 365
          }px`;
      } else {
        // console.log("salam");
        setShowProductsNumber(galeries.length);
        galeryItems.style.height = `${Math.ceil(galeries.length / 4) * 365}px`;
      }
    }
  };
  return (
    <>
      <section id="galery-section">
        <div className="container">
          <div id="galery-section-head">
            <h6>Qalereya</h6>
          </div>
          <div id="galery-items">
            {galeries.slice(0, showProductsNumber).map((galery, index) => (
              <Link
                key={index}
                to={`/galery/${galery.id}`}
                className="galery-item"
              >
                <div style={{ backgroundImage: `url(${galery.image})` }}></div>
              </Link>
            ))}
          </div>
          <button onClick={(e) => addShowProducts(e)} className="btn">
            Daha çox göstər
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Galery;

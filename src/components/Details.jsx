import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SolutionModal from "./SolutionModal";
import SolutionPopUp from "./SolutionPopUp";
import Footer from "./Footer";
import { useRef } from "react";
function Details(props) {
  const [detail, setDetail] = useState({
    created_date: "",
    description: "",
    draft: true,
    id: 1,
    image: "",
    problem: "",
    solution_text: "",
    turn: 0,
    updated_date: "",
  });
  const detailRef = useRef();
  const [details, setDetails] = useState([]);
  let { id } = useParams();
  const [index, setIndex] = useState();
  const [solutionList, setSolutionList] = useState([]);
  const [solutionLists, setSolutionLists] = useState([]);
  const [solutionItem, setSolutionItem] = useState([]);
  const [solutionItemIndex, setSolutionItemIndex] = useState();
  useEffect(() => {
    const getDetail = async () => {
      let data = await fetch("https://admin.qaraqura.com/post_list/").then(
        (a) => a.json()
      );
      setIndex(
        data
          .sort((a = 0, b = 1) => a - b)
          .findIndex((d) => Number(d.id) === Number(id))
      );
      setDetails(data);
    };
    getDetail()
    setIndex(index);
    const getSolutionList = async () => {
      let data = await fetch(`https://admin.qaraqura.com/solution_list/`).then(
        (a) => a.json()
      );
      setSolutionList(data.filter((s) => Number(s.product.id) === Number(id)));
      setSolutionLists(data);
    };
    getSolutionList();
    return () => {
      setDetail(details[index])
    };
  }, []);

  useEffect(() => {
    setIndex(details.findIndex((d) => Number(d.id) === Number(id)));
    setSolutionList(
      solutionLists.filter((s) => Number(s.product.id) === Number(id))
    );
  }, [id]);
  useEffect(() => {
    setDetail(details[index]);
    // .then(() => {


    // }
    // );
    console.log(detailRef);
  }, [index]);
  const uploadFunc = () => {
    props.dispatch({
      type: "Show_Upload_Solution",
    });
  };
  useEffect(() => {
    detailRef.current.querySelector("#problem p").innerHTML = detail?.problem
    detailRef.current.querySelector("#solving p").innerHTML = detail?.solution_text
    detailRef.current.querySelector("p").innerHTML = detail?.description
  }, [detail])
  const nextPage = (e) => {
    if (index >= details.length - 1) {
      e.preventDefault();
      return;
    }
    setIndex(index + 1);
  };
  const prevPage = (e) => {
    if (index <= 0) {
      e.preventDefault();
      return;
    }
    setIndex(index - 1);
  };
  // console.log(detail?.problem);
  return (
    <>
      <SolutionModal id={id} detail={detail} />
      <SolutionPopUp
        solutionItem={solutionItem}
        solutionList={solutionList}
        index={solutionItemIndex}
      />
      <section id="detail-section">
        <div className="container">
          <div id="detail-image">
            <div id="imgs">
              <img id="iii" src={detail && detail.image} alt="" />
              <img src="/images/rectangle-horizantal.png" alt="" />
            </div>
          </div>
          <div id="pagination">
            <Link
              onClick={(e) => prevPage(e)}
              to={`/galery/${details && details[index - 1]?.id}`}
            >
              <img src="/images/prev.svg" alt="" />
            </Link>
            <Link
              onClick={(e) => nextPage(e)}
              to={`/galery/${details && details[index + 1]?.id}`}
            >
              <img src="/images/next.svg" alt="" />
            </Link>
          </div>
        </div>
      </section>
      <section id="detail-text">
        <div className="container">
          <div id="main-text" ref={detailRef}>
            <p>

            </p>
            <div id="problem-solving">
              <div id="problem">
                <h6>Problem</h6>
                <p >
                  {/* {
                    detail?.problem
                  } */}
                </p>
              </div>
              <div id="solving">
                <h6>Həlli yolu</h6>
                <p>
                  {/* {detail?.solution_text} */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="detail-solves-section">
        <div className="container">
          <div id="details-solves-head">
            <h4>Həll yolu</h4>
            {solutionList.length < 1 && (
              <div onClick={() => uploadFunc()}>
                <div className="plus">
                  <img src="/images/group825.svg" alt="" />
                </div>
                <p>Həll yolunu yüklə</p>
              </div>
            )}
          </div>
          <div id="detail-solves">
            {solutionList?.map((solution, index) => (
              <div
                key={index}
                className="detail-solve"
                onClick={() => {
                  props.dispatch({
                    type: "Show_Details_PopUp",
                  });
                  setSolutionItem(solutionList[index]);
                  setSolutionItemIndex(index);
                }}
              >
                <div
                  style={{ backgroundImage: `url('${solution.image}')` }}
                ></div>
              </div>
            ))}

            {solutionList.length > 0 && (
              <div onClick={() => uploadFunc()} className="detail-solve">
                <img src="/images/group825.svg" alt="" />
                <p>Həll yolunu yüklə</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
const a = (b) => b;
export default connect(a)(Details);

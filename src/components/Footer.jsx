import React, { useEffect, useState } from "react";
function Footer() {
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
  return (
    <footer>
      <div className="container">
        <span>© 2022, Bütün hüquqlar qorunur.</span>
        <a id="developer" href="https://www.linkedin.com/in/ravan-khankishiyev-75a685223">Website developing by <strong>Ravan Khankishiyev</strong></a>
        <div id="social-media-icons">
          <button
            onClick={
              () =>
                // window.open(url, `${general[0]?.instagram}`, "noopener")
                window.location.replace(general[0]?.instagram)
              // window.location.href=general[0]?.instagram
              // navigate(`https://${general[0].instagram}`)
            }
            className="social-media-icon"
          >
            <img src="/images/instagram.svg" alt="" />
            {/* <img src="../images/instagram-logo.png" alt="instagram-logo" />
            <img src="../images/circle56x57.png" alt="" /> */}
          </button>
          <button
            onClick={() => window.location.replace(general[0]?.linkedin)}
            className="social-media-icon"
          >
            <img src="/images/linkedin.svg" alt="" />
            {/* <img src="../images/linkedin-logo.png" alt="linkedin-logo" />
            <img src="../images/circle56x57.png" alt="" /> */}
          </button>
          <button
            onClick={() => window.location.replace(general[0]?.facebook)}
            className="social-media-icon"
          >
            <img src="/images/facebook.svg" alt="" />

            {/* <img src="../images/facebook-logo.png" alt="facebook-logo" />
            <img src="../images/circle56x57.png" alt="" /> */}
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

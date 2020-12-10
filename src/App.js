import React, { useEffect, useState } from "react";
import "./main.scss";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import ContactMe from "./pages/contact-me";
import Footer from "./components/Footer/footer";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("data.json")
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
  if (error) return "Oops!";

  return (
    <div className="main">
      {loading ? (
        <>
          <Navbar />
          <Home _data={data} id="home" />
          <About _data={data} id="about" />
          <Projects _data={data.portfolio} to="projects" />
          <ContactMe to="contact-me" />
          <Footer _data={data} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;

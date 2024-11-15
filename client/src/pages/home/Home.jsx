import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import About from "./About";
import Contact from "./Contact";
import Hero from "./Hero";
import Services from "./Services";

const Home = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <Hero />
        <About />
        {/* <Services /> */}
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;

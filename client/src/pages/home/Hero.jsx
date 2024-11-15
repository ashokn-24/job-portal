import bgImg from "../../assets/images/job_search.jpg";

const Hero = () => {
  return (
    <div
      className="relative flex justify-center items-center h-screen bg-cover bg-center "
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-mildBlue via-transparent to-mildBlue opacity-50 "></div>
      <div className="relative z-10 text-center text-white p-10">
        <h1
          className="text-5xl font-bold mb-4 animate-fadeIn"
          style={{ textShadow: "3px 3px 4px rgba(0, 0, 255, 0.5)" }}
        >
          Unlock Your Dream Career with Job Function
        </h1>
        <p
          className="text-xl mb-8 animate-fadeIn delay-1s"
          style={{ textShadow: "3px 3px 4px rgba(0, 0, 255, 0.5)" }}
        >
          Discover thousands of job opportunities tailored to your skills and
          preferences.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full animate-bounce shadow-lg"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 255, 0.5)" }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;

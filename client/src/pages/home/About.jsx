import jobimg from "../../assets/images/job.svg";

const About = () => {
  return (
    <div className="bg-white py-16 px-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-darkBlue mb-8">
        About Us
      </h1>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            src={jobimg}
            alt="Job Portal"
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Welcome to our job portal! We bridge the gap between job seekers and
            top employers across various industries. Our mission is to provide
            you with an efficient and easy path to find your dream job.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

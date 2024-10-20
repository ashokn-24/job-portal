import jobimg from "../../assets/images/job.svg";

const About = () => {
  return (
    <div className="bg-white p-8">
      <h1 className="text-title-desktop text-center md:text-title-mobile font-serif text-darkBlue">
        About Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-4 text-justify">
          <p className="text-body-desktop md:text-body-mobile font-sans text-gray-500 mt-4">
            Welcome to our job portal! We connect job seekers with top employers
            across various industries. Our mission is to help you find your
            dream job with ease and efficiency.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Learn More
          </button>
        </div>
        <div className="flex justify-center">
          <img src={jobimg} alt="Job Portal" width={500} />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-title-desktop md:text-title-mobile font-serif text-darkBlue">
          Our Features
        </h2>
        <ul className="list-disc list-inside text-body-desktop md:text-body-mobile font-sans text-gray-500 mt-4">
          <li>Job Matching</li>
          <li>Resume Building</li>
          <li>Career Advice</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

import serviceImg from "../../assets/images/services.svg";

const Services = () => {
  return (
    <div className="bg- p-8">
      <h1 className="text-title-desktop text-center md:text-title-mobile font-serif text-darkBlue">
        Our Services
      </h1>
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <img src={serviceImg} alt="" width={400} />
        </div>
        <div className="flex items-center justify-center">
          {" "}
          <ul className="list-disc pl-5 mt-4 text-body-desktop md:text-body-mobile font-sans text-gray-500">
            <li>Job Listings</li>
            <li>Resume Building</li>
            <li>Career Counseling</li>
            <li>Interview Preparation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services;

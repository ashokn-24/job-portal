import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
const Hero = () => {
  const { Search } = Input;

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full gap-10 p-10">
        <div className="mt-10">
          <h1 className="text-title-desktop font-bold text-center text-darkBlue">
            Unlock Your Dream Career with Job Function
          </h1>
        </div>
        <div>
          <Search
            placeholder="Search jobs"
            allowClear
            enterButton={<CiSearch />}
            size="large"
            onSearch={onSearch}
            className="bg-white rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;

import { useEffect, useState } from "react";
import { Button, Flex, Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Applications from "./Applications";
import GetJobs from "./GetJobs";
import PostJob from "./PostJob";
import Navbar from "../../components/Navbar";
import { useJobs } from "../../context/JobsContext";
import { useUser } from "../../context/UserContext";
import CompanyInfo from "./CompanyInfo";

const Dashboard = () => {
  const [showJobPostForm, setShowJobPostForm] = useState(false);
  const { Header, Footer, Sider, Content } = Layout;

  const { getDashBoardData } = useJobs();
  const { user } = useUser();

  useEffect(() => {
    getDashBoardData(user?.company);
  }, []);

  const handlePostJobClick = () => {
    setShowJobPostForm(!showJobPostForm);
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(50% - 8px)",
    minHeight: "100vh",
    maxWidth: "100%",
  };

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // Initialize as string, not array

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Set the selected key as string
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <GetJobs />;
      case "2":
        return <Applications />;
      case "3":
        return <CompanyInfo />;
      case "4":
        return <PostJob />;
      default:
        return <div>Our Applications</div>; // Fallback content
    }
  };

  return (
    <>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider
            width="23%"
            trigger={null}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="bg-white text-darkBlue border-r"
          >
            <div className="demo-logo-vertical text-darkBlue font-bold text-xl text m-5 px-2">
              Job Fution!
            </div>
            <Menu
              theme="light"
              mode="inline"
              className="mt-10"
              defaultSelectedKeys={["1"]} // Default selected key
              selectedKeys={[selectedKey]} // Ensure this is an array of the current selected key
              onClick={handleMenuClick}
              title="Job Fution!  "
              items={[
                {
                  key: "1",
                  label: "Our Applications",
                },
                {
                  key: "2",
                  label: "Applicants List",
                },
                {
                  key: "3",
                  label: "Company Details",
                },
                {
                  key: "4",
                  label: "Post New Job",
                },
              ]}
            />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
              className=""
            />
          </Sider>
          <Layout>
            <Header className="bg-white text-black p-0 h-fit">
              {/* <div>
                <Navbar />
              </div> */}
            </Header>
            <Content>{renderContent()} </Content>
            {/* <Footer>Footer</Footer> */}
          </Layout>
        </Layout>
      </Flex>
    </>

    // <div className="min-h-screen bg-gray-100 p-6">
    //   <h1 className="text-4xl font-bold text-center mb-6">
    //     Employee Dashboard
    //   </h1>

    //   {/* Job Posts Section */}
    // <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    //   <h2 className="text-2xl font-bold mb-4">Your Job Posts</h2>
    //   {/* Job List */}
    // <div className="space-y-4">
    //   {/* Replace with actual job data */}
    //   <div className="p-4 bg-gray-50 rounded-lg border">
    //     <h3 className="font-semibold text-lg">Software Developer</h3>
    //     <p className="text-gray-600">Posted on: 20-Oct-2024</p>
    //     <p className="text-gray-600">Location: New York</p>
    //   </div>
    //   <div className="p-4 bg-gray-50 rounded-lg border">
    //     <h3 className="font-semibold text-lg">Data Analyst</h3>
    //     <p className="text-gray-600">Posted on: 15-Oct-2024</p>
    //     <p className="text-gray-600">Location: San Francisco</p>
    //   </div>
    // </div>
    // </div>

    //   {/* Applicants Section */}
    // <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    //   <h2 className="text-2xl font-bold mb-4">Applicants</h2>
    //   {/* Applicants List */}
    //   <div className="space-y-4">
    //     {/* Replace with actual applicant data */}
    //     <div className="p-4 bg-gray-50 rounded-lg border">
    //       <h3 className="font-semibold text-lg">John Doe</h3>
    //       <p className="text-gray-600">Applied for: Software Developer</p>
    //       <p className="text-gray-600">Status: Under Review</p>
    //     </div>
    //     <div className="p-4 bg-gray-50 rounded-lg border">
    //       <h3 className="font-semibold text-lg">Jane Smith</h3>
    //       <p className="text-gray-600">Applied for: Data Analyst</p>
    //       <p className="text-gray-600">Status: Interview Scheduled</p>
    //     </div>
    //   </div>
    // </div>

    //   {/* Post Job Section */}
    // <div className="bg-white shadow-lg rounded-lg p-6">
    //   <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
    //   <button
    //     onClick={handlePostJobClick}
    //     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
    //   >
    //     {showJobPostForm ? "Hide Job Form" : "Post Job"}
    //   </button>

    //   {/* Job Posting Form */}
    //   {showJobPostForm && (
    //     <form className="space-y-4">
    //       <div>
    //         <label className="block font-semibold">Job Title</label>
    //         <input
    //           type="text"
    //           className="w-full p-2 border rounded-lg"
    //           placeholder="Enter job title"
    //         />
    //       </div>
    //       <div>
    //         <label className="block font-semibold">Location</label>
    //         <input
    //           type="text"
    //           className="w-full p-2 border rounded-lg"
    //           placeholder="Enter job location"
    //         />
    //       </div>
    //       <div>
    //         <label className="block font-semibold">Job Description</label>
    //         <textarea
    //           className="w-full p-2 border rounded-lg"
    //           placeholder="Enter job description"
    //         ></textarea>
    //       </div>
    //       <div>
    //         <label className="block font-semibold">Salary Range</label>
    //         <input
    //           type="text"
    //           className="w-full p-2 border rounded-lg"
    //           placeholder="Enter salary range"
    //         />
    //       </div>
    //       <div>
    //         <label className="block font-semibold">Skills</label>
    //         <input
    //           type="text"
    //           className="w-full p-2 border rounded-lg"
    //           placeholder="Enter required skills"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
    //       >
    //         Submit
    //       </button>
    //     </form>
    //   )}
    // </div>
    // </div>
  );
};

export default Dashboard;

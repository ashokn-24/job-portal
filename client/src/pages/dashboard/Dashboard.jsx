/* eslint-disable no-unused-vars */
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
  );
};

export default Dashboard;

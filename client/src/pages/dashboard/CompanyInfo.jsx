import { Layout, Breadcrumb, Spin } from "antd";
import { useJobs } from "../../context/JobsContext";

const { Header, Content } = Layout;

const CompanyInfo = () => {
  const { dashboardData, loading } = useJobs();

  if (loading) {
    return <Spin fullscreen />;
  }

  const company = dashboardData?.company || {};

  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-600 text-white text-lg p-6">
        <div className="container mx-auto">
          <span className="font-bold">{company.name}</span>
        </div>
      </Header>
      <Content className="container mx-auto p-6">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Company</Breadcrumb.Item>
        </Breadcrumb>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
          <p className="mb-2">{company.description}</p>
          <p className="mb-2">
            <strong>Website:</strong>{" "}
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {company.website}
            </a>
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {company.address}
          </p>
          <p className="mb-2">
            <strong>Contact Email:</strong>{" "}
            <a
              href={`mailto:${company.contactEmail}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {company.contactEmail}
            </a>
          </p>
          <p>
            <strong>Phone Number:</strong> {company.phoneNumber}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <p>
            We offer a range of innovative tech solutions to meet your needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p>Meet our team of experts who are driving innovation.</p>
        </div>
      </Content>
    </Layout>
  );
};

export default CompanyInfo;

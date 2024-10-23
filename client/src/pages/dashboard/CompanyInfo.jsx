import { Layout, Breadcrumb, Spin } from "antd";
import { useJobs } from "../../context/JobsContext";

const CompanyInfo = () => {
  const { dashboardData, loading } = useJobs();

  if (loading) {
    return <Spin fullscreen />;
  }

  const company = dashboardData?.company || {};
  return (
    <Layout className="min-h-screen">
      <div>
        <div className="text-white text-lg">{company.name}</div>
      </div>
      <div className="p-6">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Company</Breadcrumb.Item>
        </Breadcrumb>
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
          <p>{company.description}</p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              {company.website}
            </a>
          </p>
          <p>
            <strong>Address:</strong> {company.address}
          </p>
          <p>
            <strong>Contact Email:</strong>{" "}
            <a href={`mailto:${company.contactEmail}`}>
              {company.contactEmail}
            </a>
          </p>
          <p>
            <strong>Phone Number:</strong> {company.phoneNumber}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <p>
            We offer a range of innovative tech solutions to meet your needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Our Team</h2>
          <p>Meet our team of experts who are driving innovation.</p>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyInfo;

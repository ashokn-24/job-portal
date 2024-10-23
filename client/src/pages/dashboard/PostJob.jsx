import { Form, Input, Select, Button, Space, Checkbox } from "antd";
import { useState } from "react";
import { useJobs } from "../../context/JobsContext";

const { Option } = Select;

const PostJob = () => {
  const { dashboardData, postJob } = useJobs();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "",
    workType: "",
    location: "",
    industry: "",
    experienceLevel: "",
    salaryPeriod: "",
    salaryAmount: "",
    unStipend: false,
    skills: [],
    company: "",
  });

  const handleUnStipendChange = (e) => {
    setFormData({ ...formData, unStipend: e.target.checked });
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    setFormData({
      ...values,
      industry: dashboardData?.company?.industry,
      company: dashboardData?.company?._id,
    });

    postJob(formData);
  };

  return (
    <div className="h-[100vh] overflow-auto border-2 bg-white p-10">
      {/* <div>Post New Job</div> */}
      <Form
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
        initialValues={formData}
      >
        <Form.Item label="Job Title" name="jobTitle">
          <Input
            value={formData.jobTitle}
            onChange={(e) =>
              setFormData({ ...formData, jobTitle: e.target.value })
            }
            className="border-gray-200 rounded-md"
          />
        </Form.Item>

        <Form.Item label="Job Description" name="jobDescription">
          <Input.TextArea
            rows={4}
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData({ ...formData, jobDescription: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Job Type" name="jobType">
          <Select
            value={formData.jobType}
            onChange={(value) => setFormData({ ...formData, jobType: value })}
            allowClear
          >
            <Option value="Full-time">Full-time</Option>
            <Option value="Part-time">Part-time</Option>
            <Option value="Internship">Internship</Option>
            <Option value="Contract">Contract</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Work Type" name="workType">
          <Select
            value={formData.workType}
            onChange={(value) => setFormData({ ...formData, workType: value })}
            allowClear
          >
            <Option value="Onsite">Onsite</Option>
            <Option value="WFH">WFH</Option>
            <Option value="Hybrid">Hybrid</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="border-gray-200 rounded-md"
          />
        </Form.Item>
        {/* 
        <Form.Item label="Industry" name="industry">
          <Input
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
            }
            className="border-gray-200 rounded-md"
          />
        </Form.Item> */}

        <Form.Item label="Experience Level" name="experienceLevel">
          <Select
            value={formData.experienceLevel}
            onChange={(value) =>
              setFormData({ ...formData, experienceLevel: value })
            }
            allowClear
          >
            <Option value="Fresher">Fresher</Option>
            <Option value="1-2">1-2 Years</Option>
            <Option value="2-3">2-3 Years</Option>
            <Option value="3-4">3-4 Years</Option>
            <Option value="5+ Years">5+ Years</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Salary" name="salary">
          <Space.Compact className="">
            <Select
              value={formData.salaryPeriod}
              style={{ width: "50%" }}
              onChange={(value) =>
                setFormData({ ...formData, salaryPeriod: value })
              }
              className="h-full text-sm border-none border-white"
              defaultValue={"Salary Period"}
              disabled={formData.unStipend} // Disable when checkbox is checked
            >
              <Option value="Yearly">Yearly</Option>
              <Option value="Monthly">Monthly</Option>
            </Select>
            <Input
              prefix="₹" // Prefix for currency
              value={formData.salaryAmount}
              onChange={(e) =>
                setFormData({ ...formData, salaryAmount: e.target.value })
              }
              style={{ width: "70%" }}
              noStyle
              placeholder="Enter amount"
              className="rounded-md text-sm border-gray-200"
              disabled={formData.unStipend} // Disable when checkbox is checked
            />

            <div className="flex items-end px-4">
              <Checkbox
                checked={formData.unStipend}
                className=" text-end"
                onChange={handleUnStipendChange}
                style={{ marginBottom: "8px" }}
              >
                UnStipend
              </Checkbox>
            </div>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="Skills" name="skills">
          <Select
            mode="tags"
            value={formData.skills}
            onChange={(value) => setFormData({ ...formData, skills: value })}
            placeholder="Add skills"
          ></Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostJob;

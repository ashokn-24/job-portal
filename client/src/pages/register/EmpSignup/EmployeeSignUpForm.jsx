import { useState } from "react";
import { Steps, Button, Form, Input, Select } from "antd";
import { useUser } from "../../../context/UserContext";

const { Step } = Steps;
const { Option } = Select;

const EmployeeSignUpForm = () => {
  const { employeeSignup } = useUser();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    companyAddress: "",
    companyContactEmail: "",
    companyPhoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = () => {
    employeeSignup(formData);
    console.log(formData);
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input name="name" value={formData.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input.Password
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              name="gender"
              value={formData.gender}
              onChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Company Info",
      content: (
        <Form layout="vertical">
          <Form.Item label="Company Name">
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Description">
            <Input
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Website">
            <Input
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Address">
            <Input
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Contact Email">
            <Input
              name="companyContactEmail"
              value={formData.companyContactEmail}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Company Phone Number">
            <Input
              name="companyPhoneNumber"
              value={formData.companyPhoneNumber}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-xl">
        <div className="text-center p-2">Already Have Account ? </div>

        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action mt-4">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSignUpForm;

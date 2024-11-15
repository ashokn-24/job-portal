import { useState } from "react";
import {
  Card,
  Avatar,
  List,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import { useUser } from "../../context/UserContext";
import moment from "moment";

const UserProfile = () => {
  const { user, setUser } = useUser(); // Assuming `setUser` updates user data in context
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editType, setEditType] = useState(null); // Tracks the section being edited
  const [form] = Form.useForm();

  // Show modal and set edit type (e.g., profile, education, or experience)
  const showModal = (type, data = null) => {
    setEditType(type);
    setIsModalVisible(true);
    form.setFieldsValue(data ? { ...data } : {}); // Prefill form with data if editing
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let updatedUser = { ...user };

        if (editType === "profile") {
          updatedUser = { ...updatedUser, ...values };
        } else if (editType === "education") {
          updatedUser.education = [...user.education, values];
        } else if (editType === "experience") {
          updatedUser.experience = [...user.experience, values];
        }

        setUser(updatedUser);
        message.success("Profile updated successfully!");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        message.error("Please fill in all required fields");
      });
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG files!");
      }
      return isJpgOrPng || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        const newUser = {
          ...user,
          profilePic: URL.createObjectURL(info.file.originFileObj),
        };
        setUser(newUser);
        message.success("Profile picture uploaded successfully!");
      }
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <Card bordered={false} style={{ marginBottom: "16px" }}>
        <Card.Meta
          avatar={
            <Avatar
              src={user?.profilePic || "https://via.placeholder.com/150"}
              size={80}
            />
          }
          title={<h2>{user?.name}</h2>}
          description={<p>{user?.email}</p>}
        />
        <Button
          type="primary"
          onClick={() => showModal("profile", user)}
          style={{ marginTop: "10px" }}
        >
          Edit Profile
        </Button>
      </Card>

      <Card
        title="Education"
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() => showModal("education")}
          >
            Add Education
          </Button>
        }
      >
        <List
          itemLayout="vertical"
          dataSource={user?.education}
          renderItem={(edu, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={edu.degree}
                description={`${edu.institution} (${moment(
                  edu.startDate
                ).format("YYYY-MM-DD")} - ${
                  edu.endDate
                    ? moment(edu.endDate).format("YYYY-MM-DD")
                    : "Present"
                })`}
              />
              <p>
                <strong>Grade:</strong> {edu.grade}
              </p>
            </List.Item>
          )}
        />
      </Card>

      <Card
        title="Experience"
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() => showModal("experience")}
          >
            Add Experience
          </Button>
        }
        style={{ marginTop: "16px" }}
      >
        <List
          itemLayout="vertical"
          dataSource={user?.experience}
          renderItem={(exp, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={exp.title}
                description={`${exp.company} (${moment(exp.startDate).format(
                  "YYYY-MM-DD"
                )} - ${
                  exp.endDate
                    ? moment(exp.endDate).format("YYYY-MM-DD")
                    : "Present"
                })`}
              />
              <p>
                <strong>Description:</strong> {exp.description}
              </p>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={`Edit ${editType}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {editType === "profile" && (
            <>
              <Form.Item
                name="name"
                label="Name"
                initialValue={user.name}
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                initialValue={user.email}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="profilePic" label="Profile Picture">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Upload Picture</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="resume"
                label="Resume Link"
                initialValue={user.resume}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {editType === "education" && (
            <>
              <Form.Item
                name="degree"
                label="Degree"
                rules={[{ required: true, message: "Please enter the degree" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="institution"
                label="Institution"
                rules={[
                  { required: true, message: "Please enter the institution" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select the start date" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item name="endDate" label="End Date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="grade" label="Grade">
                <Input />
              </Form.Item>
            </>
          )}

          {editType === "experience" && (
            <>
              <Form.Item
                name="title"
                label="Job Title"
                rules={[
                  { required: true, message: "Please enter the job title" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="company"
                label="Company"
                rules={[
                  { required: true, message: "Please enter the company" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select the start date" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item name="endDate" label="End Date">
                <DatePicker />
              </Form.Item>
              <Form.Item name="description" label="Job Description">
                <Input.TextArea rows={4} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;

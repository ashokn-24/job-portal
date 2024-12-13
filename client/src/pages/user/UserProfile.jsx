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
import {
  PlusOutlined,
  EditOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useUser } from "../../context/UserContext";
import moment from "moment";

const UserProfile = () => {
  const { user, setUser, updateUser } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editType, setEditType] = useState(null);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [form] = Form.useForm();

  const handleDataChange = (updatedData) => {
    setUser(updatedData);
    setHasChanges(true);
  };

  const showModal = (type, data = null, index = null) => {
    setEditType(type);
    setIsModalVisible(true);
    setCurrentEditIndex(index);
    form.setFieldsValue(data ? { ...data } : {});
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
          const updatedEducation = [...user.education];
          if (currentEditIndex !== null) {
            updatedEducation[currentEditIndex] = values;
          } else {
            updatedEducation.push(values);
          }
          updatedUser.education = updatedEducation;
        } else if (editType === "experience") {
          const updatedExperience = [...user.experience];
          if (currentEditIndex !== null) {
            updatedExperience[currentEditIndex] = values;
          } else {
            updatedExperience.push(values);
          }
          updatedUser.experience = updatedExperience;
        }

        handleDataChange(updatedUser);
        message.success("Data updated successfully!");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(() => {
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
        handleDataChange(newUser);
        message.success("Profile picture uploaded successfully!");
      }
    },
  };

  const handleUpdateProfile = () => {
    updateUser(user);
    setTimeout(() => {
      setHasChanges(false);
      message.success("Profile updated on server!");
    }, 1000);
  };

  const handleRemoveItem = (type, index) => {
    const updatedUser = { ...user };
    if (type === "education") {
      updatedUser.education = user.education.filter((_, i) => i !== index);
    } else if (type === "experience") {
      updatedUser.experience = user.experience.filter((_, i) => i !== index);
    }
    handleDataChange(updatedUser);
    message.success("Item removed successfully!");
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

      <Card title="Resume">
        {user?.resume ? (
          <a href={user?.resume} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        ) : (
          <span>No resume uploaded</span>
        )}
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
        style={{ marginTop: "16px" }}
      >
        <List
          itemLayout="vertical"
          dataSource={user?.education}
          renderItem={(edu, index) => (
            <List.Item
              key={index}
              actions={[
                <Button
                  key={new Date()}
                  icon={<EditOutlined />}
                  onClick={() => showModal("education", edu, index)}
                />,
                <Button
                  key={new Date()}
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveItem("education", index)}
                />,
              ]}
            >
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
            <List.Item
              key={index}
              actions={[
                <Button
                  key={new Date()}
                  icon={<EditOutlined />}
                  onClick={() => showModal("experience", exp, index)}
                />,
                <Button
                  key={new Date()}
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveItem("experience", index)}
                />,
              ]}
            >
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
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
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
              <Form.Item name="resume" label="Resume Link">
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
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true, message: "Please enter the grade" }]}
              >
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
              <Form.Item
                name="description"
                label="Job Description"
                rules={[
                  { required: true, message: "Please enter a job description" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>

      {hasChanges && (
        <Button
          type="primary"
          onClick={handleUpdateProfile}
          style={{ marginTop: "16px" }}
        >
          Update Profile
        </Button>
      )}
    </div>
  );
};

export default UserProfile;

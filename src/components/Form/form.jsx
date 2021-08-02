import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from "antd";

import "./form.css";

const FormUI = ({ handleSubmit }) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const onFinish = (values) => {
        handleSubmit(values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 80,
                }}
            >
                <Option value="61">+61</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form form={form} layout={"vertical"} name="register" onFinish={onFinish}>
            <Form.Item
                name="firstName"
                label={<span style={{ color: "rgb(102, 102, 102)", fontSize: "16px" }}>First Name</span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                    },
                ]}
                style={{ color: "rgb(102, 102, 102) !important" }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastName"
                label={<span style={{ color: "rgb(102, 102, 102)", fontSize: "16px" }}>Last Name</span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your last name!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label={<span style={{ color: "rgb(102, 102, 102)", fontSize: "16px" }}>Email</span>}
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your E-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="mobileNumber"
                label={<span style={{ color: "rgb(102, 102, 102)", fontSize: "16px" }}>Mobile Number </span>}
                rules={[
                    {
                        required: true,
                        message: "Please input your mobile number!",
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>

            <button htmltype="submit" className="register-btn">
                Register and Pay
            </button>
        </Form>
    );
};

export default FormUI;

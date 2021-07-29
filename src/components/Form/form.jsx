import { useState } from "react";
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
                    width: 70,
                }}
            >
                <Option value="61">+61</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form form={form} layout={"vertical"} name="register" onFinish={onFinish} style={{ fontFamily: "Lato, sans-serif", fontSize: "1rem" }}>
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastName"
                label="Last Name"
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
                label="E-mail"
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
                label="Mobile Number"
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

            <Form.Item>
                <button htmltype="submit" className="register-btn">
                    Register and Pay
                </button>
            </Form.Item>
        </Form>
    );
};

export default FormUI;

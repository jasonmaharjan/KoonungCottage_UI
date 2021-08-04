import { useState, useEffect } from "react";
import FormUI from "../Form/form";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { notification } from "antd";
import "./registerUI.css";

const RegisterUI = ({ courseData, activityData }) => {
    const [activity, setActivity] = useState(null);
    const { id } = useParams();

    const getEntry = async () => {
        const url = `https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivity/${id}`;
        const res = await axios.get(url);
        return res.data;
    };

    useEffect(async () => {
        const res = await getEntry();
        setActivity(res);
    }, []);

    const openNotification = ({ message, description, type }) => {
        notification[type]({
            message,
            description,
            duration: 3,
        });
    };

    const handlePostReq = async (memberInfo) => {
        const url1 = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/createMember";
        const url2 = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/createAttendance";

        // API call for member
        const reqBody1 = JSON.stringify(memberInfo);
        const memberReq = await axios.post(url1, reqBody1);
        const memberId = memberReq.data.entry.id;

        // API call for attendance
        const attendanceInfo = {
            activityId: [`${activity.id}`],
            memberId: [`${memberId}`],
        };
        const reqBody2 = attendanceInfo;
        const attendanceReq = await axios.post(url2, reqBody2);

        if (activityData["activity-fee"] > 0) {
            const queryParams = queryString.stringify({
                amount: activity["activity-fee"] ? activity["activity-fee"] : 0,
                description: `Payment for ${activity["name"]}`,
                amount_editable: false,
                success_url:
                    // process.env.NODE_ENV === "development" ?
                    //http://localhost:3000/payment/${attendanceReq.data.entry.id}`,
                    `https://nh.kalysys.com.au/payment/${attendanceReq.data.entry.id}`,
                email: attendanceReq.data.entry.email,
            });

            window.location.href = `https://pay.pinpayments.com/riba/test?${queryParams}`;
        } else {
            openNotification({ type: "success", message: "Success", description: "Member created successfully" });
        }
    };

    const handleSubmit = async (values) => {
        if (values) {
            const { firstName, lastName, email, prefix, mobileNumber } = values;
            const memberInfo = {
                firstName,
                lastName,
                email,
                phone: prefix + mobileNumber,
                type: [],
            };
            handlePostReq(memberInfo);
        } else alert("Missing credentials");
    };

    return (
        <section className="registerUI">
            <div style={{ marginBottom: "2rem", fontSize: "1.25rem", color: "#24678d" }}>Your Registration Details</div>
            <FormUI activityData={activityData} courseData={courseData} handleSubmit={handleSubmit} />
        </section>
    );
};

export default RegisterUI;

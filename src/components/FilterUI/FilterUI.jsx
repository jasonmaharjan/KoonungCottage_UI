import { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import "antd/dist/antd.css";

import axios from "axios";
import "./filterUI.css";

const FilterUI = ({ selectActivity, selectActivityCategory, update }) => {
    const [date, setDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);

    const { RangePicker } = DatePicker;
    const { Option } = Select;

    useEffect(() => {
        setDate(date);
    }, [date]);

    const setVal = (selectedDate) => {
        console.log(selectedDate);
        setDate(selectedDate);
        if (date) handleChange();
    };

    const handleChange = async ({ activityType = null, activityCategory = null }) => {
        let startDate = null;
        let endDate = null;

        if (date) {
            startDate = date[0];
            endDate = date[1];
            console.log("changes-->", activityType, activityCategory, date);
        }

        const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
        let filteredData = null;

        if (activityType && !date && !activityCategory) {
            filteredData = await axios.get(url, { params: { activityType } });
            update(filteredData.data.entries);
        } else if (!activityType && !date && activityCategory) {
            filteredData = await axios.get(url, { params: { activityType } });
            update(filteredData.data.entries);
        } else if (date && !activityType) {
            filteredData = await axios.get(url, {
                params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
            update(filteredData.data.entries);
        } else if (date && !activityCategory) {
            filteredData = await axios.get(url, {
                params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
            update(filteredData.data.entries);
        } else if (activityType && activityCategory && date) {
            filteredData = await axios.get(url, {
                params: { activityType, activityCategory, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
            update(filteredData.data.entries);
        }
    };

    return (
        <section className="filterUI">
            <div className="filterUI-content">
                <div style={{ marginBottom: "1rem" }}>
                    <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                        <div style={{ marginBottom: "1rem" }} />

                        <Space direction="vertical" size={12}>
                            <RangePicker
                                onChange={(date) => {
                                    setVal(date);
                                }}
                            />
                        </Space>
                        <div>
                            <Select
                                placeholder="Select an activity category"
                                style={{ marginTop: "1rem", width: "40%", marginRight: "1rem" }}
                                onChange={(option) => {
                                    handleChange({ activityCategory: option });
                                }}
                                allowClear
                            >
                                {selectActivityCategory.map((category) => (
                                    <Option value={category.value}>{category.label}</Option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Select an activity"
                                style={{ marginTop: "1rem", width: "40%" }}
                                onChange={(option) => {
                                    handleChange({ activityType: option });
                                }}
                                allowClear
                            >
                                {selectActivity.map((activity) => (
                                    <Option value={activity.value}>{activity.label}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterUI;

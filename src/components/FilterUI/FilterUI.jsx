import { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import "antd/dist/antd.css";

import axios from "axios";
import "./filterUI.css";

const FilterUI = ({ selectValues, update }) => {
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

    const handleChange = async (selectedOption) => {
        let startDate = null;
        let endDate = null;

        if (date) {
            startDate = date[0];
            endDate = date[1];
            console.log("changes-->", selectedOption, date);
        }

        const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
        let filteredData = null;

        if (selectedOption && !date) {
            filteredData = await axios.get(url, { params: { activity: selectedOption } });
            update(filteredData.data.entries);
        } else if (date && !selectedOption) {
            filteredData = await axios.get(url, {
                params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
            update(filteredData.data.entries);
        } else if (selectedOption && date) {
            filteredData = await axios.get(url, {
                params: { activity: selectedOption, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
            update(filteredData.data.entries);
        }
    };

    return (
        <section className="filterUI">
            <div className="filterUI-content">
                <div style={{ marginBottom: "1rem" }}>
                    <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                        <div style={{ marginBottom: "0.5rem" }}>Filters: </div>

                        <Space direction="vertical" size={12}>
                            <RangePicker
                                onChange={(date) => {
                                    setVal(date);
                                }}
                            />
                        </Space>

                        <Select
                            placeholder="Select an activity"
                            style={{ marginTop: "1rem", width: "80%" }}
                            onChange={(option) => {
                                console.log(option);
                                handleChange(option);
                            }}
                            allowClear
                        >
                            {selectValues.map((selectValue) => (
                                <Option value={selectValue.value}>{selectValue.label}</Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterUI;

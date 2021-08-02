import { useState, useEffect, useRef } from "react";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import "antd/dist/antd.css";

import axios from "axios";
import "./filterUI.css";

import { filter } from "../../utils/utils";

const FilterUI = ({ selectActivity, selectActivityCategory, updateActivities, updateActivityTypes }) => {
    const [date, setDate] = useState(null);
    const [activityType, setActivityType] = useState(null);
    const [activityCategory, setActivityCategory] = useState(null);

    const { RangePicker } = DatePicker;
    const { Option } = Select;

    useEffect(async () => {
        if (date) {
            const filteredData = await filter({
                activityTypeOption: activityType,
                activityCategoryOption: activityCategory,
                startDateOption: date[0],
                endDateOption: date[1],
            });
            updateActivities(filteredData);
        } else {
            const filteredData = await filter({
                activityTypeOption: activityType,
                activityCategoryOption: activityCategory,
                startDateOption: null,
                endDateOption: null,
            });
            updateActivities(filteredData);
        }
    }, [date]);

    const filterData = async ({ activityTypeOption, activityCategoryOption }) => {
        const filteredData = await filter({
            activityTypeOption,
            activityCategoryOption,
            startDateOption: date ? date[0] : null,
            endDateOption: date ? date[1] : null,
        });

        updateActivities(filteredData);
    };

    const handleChange = async ({ activityTypeOption = null, activityCategoryOption = null, clearCategory }) => {
        if (clearCategory) {
            filterData({ activityTypeOption, activityCategoryOption });
        } else if (activityCategoryOption && !activityTypeOption) {
            // get the activity types of a single selected category
            const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivityTypes";
            const activityTypes = await axios.get(url, {
                params: { activityCategory: activityCategoryOption },
            });
            updateActivityTypes(activityTypes.data.entries);
            filterData({ activityTypeOption, activityCategoryOption });
        } else if (activityTypeOption && !activityCategoryOption) {
            filterData({ activityTypeOption, activityCategoryOption });
        } else if (!activityTypeOption && activityCategory && !clearCategory) {
            filterData({ activityTypeOption, activityCategoryOption: activityCategory });
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
                                    setDate(date);
                                }}
                            />
                        </Space>
                        <div>
                            <Select
                                placeholder="Select an activity category"
                                style={{ marginTop: "1rem", width: "25rem", marginRight: "1rem" }}
                                onChange={(option) => {
                                    setActivityType(null);
                                    setActivityCategory(option);
                                    option ? handleChange({ activityCategoryOption: option }) : handleChange({ clearCategory: true });
                                }}
                                allowClear
                                value={activityCategory}
                            >
                                {selectActivityCategory.map((category) => (
                                    <Option value={category.value}>{category.label}</Option>
                                ))}
                            </Select>

                            <Select
                                placeholder="Select an activity"
                                style={{ marginTop: "1rem", width: "25rem" }}
                                onChange={(option) => {
                                    setActivityType(option);
                                    handleChange({ activityTypeOption: option });
                                }}
                                allowClear
                                value={activityType}
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

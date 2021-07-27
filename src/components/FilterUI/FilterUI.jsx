import { useState, useEffect } from "react";
import Select from "react-select";
import Button from "../Button/Button";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import "./filterUI.css";

const FilterUI = () => {
    const [selectValues, setSelectValues] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onButtonClicked = async () => {
        const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
        let filteredData = null;

        if (selectedOptions) {
            filteredData = await axios.get(url, { params: { activity: selectedOptions.value } });
        } else if (startDate && endDate) {
            filteredData = await axios.get(url, {
                params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
        } else if (selectedOptions && startDate && endDate) {
            filteredData = await axios.get(url, {
                params: { activity: selectedOptions.value, startDate: startDate.toISOString(), endDate: endDate.toISOString() },
            });
        }
        console.log(filteredData);
    };

    const handleChange = (value) => {
        setSelectedOptions(value);
    };

    let dummy = [];
    useEffect(async () => {
        const resData = await axios.get("https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getSelectValues");
        if (resData) {
            resData.data.selectValues.entries.map((entry) => dummy.push({ value: entry.id, label: entry.name }));
            setSelectValues(dummy);
        }
    }, []);

    return (
        <section className="filterUI">
            <div className="filterUI-content">
                <div style={{ marginBottom: "1rem" }}>
                    <div style={{ marginBottom: "1rem", display: "flex" }}>
                        <div style={{ marginRight: "2rem" }}>
                            <span style={{ marginRight: "0.5rem" }}>Start Date:</span>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div>
                            <span style={{ marginRight: "0.5rem" }}>End Date:</span>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                    {selectValues ? (
                        <Select
                            onChange={handleChange}
                            // isMulti
                            name="activityValues"
                            options={selectValues}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    ) : null}
                </div>

                <Button title="filter" onClick={() => onButtonClicked()} />
            </div>
        </section>
    );
};

export default FilterUI;

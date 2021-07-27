import { useState } from "react";
import Select from "react-select";
import Button from "../Button/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./filterUI.css";

const FilterUI = () => {
    const activityTypes = [
        { value: "Beginners Art", label: "Beginners Art" },
        { value: "Beginners Botanical", label: "Beginners Botanical" },
        { value: "Book Group", label: "Book Group" },
        { value: "Child Care", label: "Child Care" },
    ];
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const onButtonClicked = () => {
        console.log(startDate, endDate, selectedOptions);
    };

    const handleChange = (value) => {
        setSelectedOptions(value);
    };

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

                    <Select
                        onChange={handleChange}
                        isMulti
                        name="activityTypes"
                        options={activityTypes}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

                <Button title="filter" onClick={() => onButtonClicked()} />
            </div>
        </section>
    );
};

export default FilterUI;

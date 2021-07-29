import { useState, useEffect } from "react";
import axios from "axios";

import FilterUI from "../../components/FilterUI/FilterUI";
import TableUI from "../../components/TableUI/TableUI";

const MainPage = () => {
    const [activitiesData, setActivitiesData] = useState(null);
    const [selectValues, setSelectValues] = useState(null);

    const getEntries = async () => {
        const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
        const res = await axios.get(url);
        return res.data.entries;
    };

    let dummy = [];

    useEffect(async () => {
        const entries = await getEntries();
        setActivitiesData(entries);

        const resData = await axios.get("https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getSelectValues");
        if (resData) {
            resData.data.selectValues.entries.map((entry) => dummy.push({ value: entry.id, label: entry.name }));
            setSelectValues(dummy);
        }
    }, []);

    const updateActivities = (filteredData) => {
        console.log("filteredData =>", filteredData);
        setActivitiesData(filteredData);
    };
    return (
        <section style={{}}>
            {selectValues && activitiesData ? (
                <>
                    <FilterUI selectValues={selectValues} update={updateActivities} />
                    <TableUI activitiesData={activitiesData} />
                </>
            ) : null}
        </section>
    );
};

export default MainPage;

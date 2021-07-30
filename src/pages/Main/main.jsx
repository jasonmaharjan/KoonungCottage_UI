import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import { Menu, Dropdown, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ButtonUI from "../../components/Button/Button";

import Spinner from "../../components/Spinner/spinner";
import FilterUI from "../../components/FilterUI/FilterUI";
import TableUI from "../../components/TableUI/TableUI";
import TilesUI from "../../components/TilesUI/TilesUI";

const Main = () => {
    const [activitiesData, setActivitiesData] = useState(null);
    const [selectActivity, setSelectActivity] = useState(null);
    const [selectActivityCategory, setSelectActivityCategory] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [layout, setLayout] = useState("table");

    const getEntries = async () => {
        const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
        const res = await axios.get(url);
        return res.data.entries;
    };

    let dummy1 = [];
    let dummy2 = [];

    useEffect(async () => {
        const entries = await getEntries();
        setActivitiesData(entries);

        const resActivityTypes = await axios.get("https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivityTypes");
        const resActivityCategories = await axios.get("https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivityCategories");

        if (resActivityTypes && resActivityCategories) {
            resActivityTypes.data.entries.map((entry) => dummy1.push({ value: entry.id, label: entry.name }));
            resActivityCategories.data.entries.map((entry) => dummy2.push({ value: entry.id, label: entry.name }));

            setSelectActivity(dummy1);
            setSelectActivityCategory(dummy2);
            setIsLoading(false);
        }
    }, []);

    const updateActivities = (filteredData) => {
        console.log("filteredData =>", filteredData);
        setActivitiesData(filteredData);
    };

    const onClick = () => {
        setShowFilters(!showFilters);
    };

    const handleMenuClick = (e) => {
        if (e.key === "table") setLayout("table");
        else if (e.key === "tiles") setLayout("tiles");
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="table">Table Layout</Menu.Item>
            <Menu.Item key="tiles">Tiles Layout</Menu.Item>
        </Menu>
    );

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <section>
                    {selectActivity && selectActivityCategory && activitiesData ? (
                        <div style={{ display: "grid", gridTemplateRows: "max-content max-content", gridGap: "2rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <ButtonUI title="filter" onClick={onClick} />

                                <div>
                                    <Space wrap>
                                        <Dropdown overlay={menu}>
                                            <Button>
                                                Change Layout <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Space>
                                </div>
                            </div>
                            {showFilters ? (
                                <FilterUI selectActivity={selectActivity} selectActivityCategory={selectActivityCategory} update={updateActivities} />
                            ) : null}
                            {layout === "table" ? (
                                <TableUI activitiesData={activitiesData} />
                            ) : layout === "tiles" ? (
                                <TilesUI activitiesData={activitiesData} categoriesData={selectActivityCategory} />
                            ) : null}
                        </div>
                    ) : null}
                </section>
            )}
        </>
    );
};

export default Main;

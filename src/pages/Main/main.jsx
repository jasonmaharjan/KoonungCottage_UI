import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

import { getEntries } from "../../utils/api";

import qs from "query-string";

import { filter } from "../../utils/utils";

import { Menu, Dropdown, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { notification } from "antd";
import ButtonUI from "../../components/Button/Button";
import Spinner from "../../components/Spinner/spinner";
import FilterUI from "../../components/FilterUI/FilterUI";
import TableUI from "../../components/TableUI/TableUI";

import TilesUI from "../../components/TilesUI/TilesUI";

const Main = () => {
    const [allEntriesData, setAllEntriesData] = useState(null);

    const [activitiesData, setActivitiesData] = useState(null);
    const [selectActivity, setSelectActivity] = useState(null);
    const [selectActivityCategory, setSelectActivityCategory] = useState(null);

    const [coursesData, setCoursesData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [layout, setLayout] = useState("tiles");

    const location = useLocation();
    const history = useHistory();

    let dummy1 = [];
    let dummy2 = [];

    useEffect(async () => {
        const resActivities = await getEntries("getActivities");
        const resCourses = await getEntries("getCourses");

        // console.log(resActivities, resCourses);

        setActivitiesData(resActivities);
        setCoursesData(resCourses);
        setAllEntriesData([...resCourses, ...resActivities]);

        const resActivityTypes = await getEntries("getActivityTypes");
        const resActivityCategories = await getEntries("getActivityCategories");

        if (resActivityTypes && resActivityCategories) {
            resActivityTypes.map((entry) => dummy1.push({ value: entry.id, label: entry.name }));
            resActivityCategories.map((entry) => dummy2.push({ value: entry.id, label: entry.name }));

            setSelectActivity(dummy1);
            setSelectActivityCategory(dummy2);
            setIsLoading(false);
        }
    }, []);

    const openNotification = ({ message, description, type }) => {
        notification[type]({
            message,
            description,
            duration: 3,
        });
    };

    useEffect(() => {
        (async function getFilteredData() {
            if (location.search) {
                const category = qs.parse(location.search);

                if (category.id) {
                    const filteredActivities = await filter({
                        activityCategoryOption: category.id,
                        type: "activity",
                    });

                    const filteredCourses = await filter({
                        activityCategoryOption: category.id,
                        type: "course",
                    });

                    setActivitiesData(filteredActivities);
                    setCoursesData(filteredCourses);

                    const filteredData = [...filteredCourses, ...filteredActivities];

                    // console.log(filteredData);
                    setAllEntriesData(filteredData);
                }

                if (category["charge_token"]) {
                    openNotification({ type: "success", message: "Payment info", description: "Payment was successful" });
                    history.push({
                        pathname: location.pathname,
                    });
                }
            }
        })();
    }, [location]);

    // filter the activity types for a selected category
    // const updateActivityTypes = (filteredData) => {
    //     const filteredActivityTypes = [];
    //     filteredData.map((entry) => filteredActivityTypes.push({ value: entry.id, label: entry.name }));
    //     setSelectActivity(filteredActivityTypes);
    // };

    // const onClick = () => {
    //     setShowFilters(!showFilters);
    // };

    // const menu = (
    //     <Menu onClick={handleMenuClick}>
    //         <Menu.Item key="table">Table Layout</Menu.Item>
    //         <Menu.Item key="tiles">Tiles Layout</Menu.Item>
    //     </Menu>
    // );

    // const handleMenuClick = (e) => {
    //     if (e.key === "table") setLayout("table");
    //     else if (e.key === "tiles") setLayout("tiles");
    // };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <section>
                    {selectActivity && selectActivityCategory && activitiesData ? (
                        <div style={{ display: "grid", gridTemplateRows: "max-content max-content", gridGap: "2rem" }}>
                            <>
                                {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                                <FilterUI
                                    selectActivity={selectActivity}
                                    selectActivityCategory={selectActivityCategory}
                                    updateActivities={updateActivities}
                                    updateActivityTypes={updateActivityTypes}
                                />
                            ) : null} */}
                            </>
                            {layout === "table" ? (
                                <TableUI
                                    activitiesData={activitiesData}
                                    coursesData={coursesData}
                                    allEntriesData={allEntriesData}
                                    categoriesData={selectActivityCategory}
                                />
                            ) : layout === "tiles" ? (
                                <TilesUI
                                    activitiesData={activitiesData}
                                    coursesData={coursesData}
                                    allEntriesData={allEntriesData}
                                    categoriesData={selectActivityCategory}
                                />
                            ) : null}
                        </div>
                    ) : null}
                </section>
            )}
        </>
    );
};

export default Main;

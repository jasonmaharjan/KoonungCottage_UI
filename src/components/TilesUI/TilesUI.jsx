import React from "react";
import { List, Avatar, Space } from "antd";

import { Link } from "react-router-dom";
import CardUI from "../CardUI/CardUI";
import CategoriesUI from "../CategoriesUI/CategoriesUI";
import Button from "../Button/Button";

import "./tiles.css";

const TilesUI = ({ activitiesData, coursesData, allEntriesData, categoriesData }) => {
    console.log("ALL ENTRIES DATA ===> ", allEntriesData);
    return (
        <section className="tilesUI">
            <section className="tilesUI-content">
                {allEntriesData.length ? (
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            },
                            pageSize: 5,
                        }}
                        dataSource={allEntriesData}
                        renderItem={(data) => {
                            // console.log("Data ===>", data);
                            return (
                                <>
                                    <List.Item key={data.value} style={{ padding: "1rem 0rem 2rem" }}>
                                        <>
                                            <>
                                                <CardUI data={data} />
                                                <Link to={data.type === "course" ? `/course/${data.id}` : `/activity/${data.id}`}>
                                                    <Button title="register" />
                                                </Link>
                                            </>
                                        </>
                                    </List.Item>
                                </>
                            );
                        }}
                    />
                ) : (
                    <div className="tilesUI-no-info">No activities/courses scheduled</div>
                )}
            </section>

            <section className="categoriesUI">
                <div>Categories </div>
                <CategoriesUI categories={categoriesData} />
            </section>
        </section>
    );
};

export default TilesUI;

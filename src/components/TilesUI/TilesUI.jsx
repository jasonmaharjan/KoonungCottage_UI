import React from "react";
import { List, Avatar, Space } from "antd";

import { Link } from "react-router-dom";
import CardUI from "../CardUI/CardUI";
import CategoriesUI from "../CategoriesUI/CategoriesUI";
import Button from "../Button/Button";

import "./tiles.css";

const TilesUI = ({ activitiesData, categoriesData, updateActivities }) => {
    console.log(activitiesData);
    return (
        <section className="tilesUI">
            <section className="tilesUI-content">
                {activitiesData.length ? (
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            },
                            pageSize: 8,
                        }}
                        dataSource={activitiesData}
                        renderItem={(activity) => {
                            return (
                                <>
                                    <List.Item key={activity.value} style={{ padding: "1rem 0rem 2rem" }}>
                                        <>
                                            <>
                                                <CardUI data={activity} />
                                                <Link to={`/${activity.id}`}>
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
                    <div className="tilesUI-no-info">No activities scheduled</div>
                )}
            </section>

            <section className="categoriesUI">
                <div>Categories </div>
                <CategoriesUI categories={categoriesData} updateActivities={updateActivities} />
            </section>
        </section>
    );
};

export default TilesUI;

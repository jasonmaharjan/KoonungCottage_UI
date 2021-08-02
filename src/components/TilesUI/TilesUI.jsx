import React from "react";
import { List, Avatar, Space } from "antd";

import { Link } from "react-router-dom";
import CardUI from "../CardUI/CardUI";
import CategoriesUI from "../CategoriesUI/CategoriesUI";
import Button from "../Button/Button";

import "./tiles.css";

const TilesUII = ({ activitiesData, categoriesData, updateActivities }) => {
    return (
        <section className="tilesUI">
            <section className="tilesUI-content">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={activitiesData}
                    renderItem={(activity) => {
                        console.log("activity", activity);
                        return (
                            <>
                                <List.Item key={activity.value}>
                                    <>
                                        {activity ? (
                                            <>
                                                <CardUI data={activity} />
                                                <Link to={`/${activity.id}`}>
                                                    <Button title="register" />
                                                </Link>
                                            </>
                                        ) : (
                                            <div className="tilesUI-no-info">No activities scheduled</div>
                                        )}
                                    </>
                                </List.Item>
                            </>
                        );
                    }}
                />
            </section>

            <section className="categoriesUI">
                <div>Categories </div>
                <CategoriesUI categories={categoriesData} updateActivities={updateActivities} />
            </section>
        </section>
    );
};

export default TilesUII;

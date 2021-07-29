import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Button from "../Button/Button";
import axios from "axios";

import "./activityUI.css";

const ActivityUI = () => {
    const [activity, setActivity] = useState(null);
    const { id } = useParams();

    const getEntry = async () => {
        const url = `https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivity/${id}`;
        const res = await axios.get(url);
        return res.data;
    };

    useEffect(async () => {
        const res = await getEntry();
        setActivity(res);
    }, []);

    console.log(activity);

    return (
        <section className="activityUI">
            {activity ? (
                <div className="activity-card">
                    <div className="activity-card-header">{activity.name}</div>
                    <div className="activity-card-body">
                        <div>
                            <div className="activity-card-title">Delivery Method:</div>
                            {activity["delivery-method"].length ? (
                                <div className="activity-card-content">{activity["delivery-method"][0].value}</div>
                            ) : (
                                <div className="activity-card-content">-</div>
                            )}
                        </div>
                        <div>
                            <div className="activity-card-title">Duration:</div>
                            <div className="activity-card-content">{activity["duration"]} minutes</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Start Date</div>
                            <div className="activity-card-content">{moment(activity["start-time"]).format("YYYY-MM-DD")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">End Date</div>
                            <div className="activity-card-content">{moment(activity["end-time"]).format("YYYY-MM-DD")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Room:</div>
                            {activity["room"].length ? (
                                <div className="activity-card-content">{activity["room"][0].value}</div>
                            ) : (
                                <div className="activity-card-content">-</div>
                            )}
                        </div>

                        <div>
                            <div className="activity-card-title">Cost:</div>
                            <div className="activity-card-content">AUD {activity["activity-fee"]}</div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default ActivityUI;
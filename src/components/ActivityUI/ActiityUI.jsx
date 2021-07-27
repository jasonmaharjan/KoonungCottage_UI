import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Button from "../Button/Button";
import axios from "axios";

import "./activity.css";

const ActiityUI = () => {
    const [activity, setActivity] = useState(null);
    const { id } = useParams();

    const getEntry = async () => {
        const url = `https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivity/${id}`;
        const res = await axios.get(url);
        return res.data;
    };

    useEffect(async () => {
        const res = await getEntry();
        setActivity(res.entry);
    }, []);

    console.log(activity);

    return (
        <section className="activityUI">
            Activity Info:
            {activity ? (
                <div className="activity-card">
                    <div className="activity-card-header">{activity.name}</div>
                    <div className="activity-card-body">
                        <div>
                            <div className="activity-card-title">Delivery Method:</div>
                            <div className="activity-card-content">{activity["delivery-method"][0].value}</div>
                        </div>
                        <div>
                            <div className="activity-card-title">Duration:</div>
                            <div className="activity-card-content">{activity["duration"]} minutes</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Start Time</div>
                            <div className="activity-card-content">{moment(activity["start-time"]).format("YYYY-MM-DD")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">End Time</div>
                            <div className="activity-card-content">{moment(activity["end-time"]).format("YYYY-MM-DD")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Room:</div>
                            <div className="activity-card-content">{activity["room"][0].value}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Cost:</div>
                            <div className="activity-card-content">{activity["cost"] ? activity["cost"] : "N/A"}</div>
                        </div>
                    </div>

                    <center>
                        <Link to={`/${id}/register`}>
                            <button className="button"> Register and Pay</button>
                        </Link>
                    </center>
                </div>
            ) : null}
        </section>
    );
};

export default ActiityUI;

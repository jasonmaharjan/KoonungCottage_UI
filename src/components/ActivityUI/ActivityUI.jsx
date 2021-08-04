import moment from "moment";

import "./activityUI.css";

const ActivityUI = ({ activity }) => {
    const markup = { __html: activity["short-description"] };
    return (
        <section className="activityUI">
            {activity ? (
                <div className="activity-card">
                    <div className="activity-card-header">{activity.name.replace(/-.*$/, "")}</div>
                    <div className="activity-card-body">
                        <div>
                            <div className="activity-card-title">Start Date</div>
                            <div className="activity-card-content">{moment(activity["start-time"]).format("DD/MM/YYYY")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Start Time</div>
                            <div className="activity-card-content">{moment(activity["start-time"]).format("hh:mm A")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Duration</div>
                            <div className="activity-card-content">{activity["duration"] ? activity["duration"] + " minutes" : "N/A"} </div>
                        </div>

                        <div>
                            <div className="activity-card-title">Cost</div>
                            <div className="activity-card-content">{activity["activity-fee"] ? `AUD ${activity["activity-fee"]}` : "N/A"}</div>
                        </div>

                        {/* <div>
                            <div className="activity-card-title">Delivery Method:</div>
                            {activity["delivery-method"].length ? (
                                <div className="activity-card-content">{activity["delivery-method"][0].value}</div>
                            ) : (
                                <div className="activity-card-content">-</div>
                            )}
                        </div> */}

                        {/* <div>
                            <div className="activity-card-title">End Date</div>
                            <div className="activity-card-content">{moment(activity["end-time"]).format("DD/MM/YYYY")}</div>
                        </div>

                        <div>
                            <div className="activity-card-title">Room:</div>
                            {activity["room"].length ? (
                                <div className="activity-card-content">{activity["room"][0].value}</div>
                            ) : (
                                <div className="activity-card-content">-</div>
                            )}
                        </div> */}

                        <div style={{ gridColumn: "1 / -1", textAlign: "left" }}>
                            <div className="activity-card-title">Description</div>
                            <div className="activity-card-content">
                                <div className="cardUI-body-content-desc" dangerouslySetInnerHTML={markup} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default ActivityUI;

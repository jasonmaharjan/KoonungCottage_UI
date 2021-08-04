import moment from "moment";

import "./courseUI.css";

const CourseUI = ({ course }) => {
    const markup = { __html: course["short-description"] };
    return (
        <section className="courseUI">
            {course ? (
                <div className="course-card">
                    <div className="course-card-header">{course.name.replace(/-.*$/, "")}</div>
                    <div className="course-card-body">
                        <div>
                            <div className="course-card-title">Start Date</div>
                            <div className="course-card-content">{moment(course["start-time"]).format("DD/MM/YYYY")}</div>
                        </div>

                        <div>
                            <div className="course-card-title">Start Time</div>
                            <div className="course-card-content">{moment(course["start-time"]).format("hh:mm A")}</div>
                        </div>

                        <div>
                            <div className="course-card-title">Duration</div>
                            <div className="course-card-content">{course["duration"] ? course["duration"] + "minutes" : "N/A"} </div>
                        </div>

                        <div>
                            <div className="course-card-title">Cost</div>
                            <div className="course-card-content">{course["course-fee"] ? `AUD ${course["course-fee"]}` : "N/A"}</div>
                        </div>

                        {/* <div>
                            <div className="course-card-title">Delivery Method:</div>
                            {course["delivery-method"].length ? (
                                <div className="course-card-content">{course["delivery-method"][0].value}</div>
                            ) : (
                                <div className="course-card-content">-</div>
                            )}
                        </div> */}

                        {/* <div>
                            <div className="course-card-title">End Date</div>
                            <div className="course-card-content">{moment(course["end-time"]).format("DD/MM/YYYY")}</div>
                        </div>

                        <div>
                            <div className="course-card-title">Room:</div>
                            {course["room"].length ? (
                                <div className="course-card-content">{course["room"][0].value}</div>
                            ) : (
                                <div className="course-card-content">-</div>
                            )}
                        </div> */}

                        <div style={{ gridColumn: "1 / -1", textAlign: "left" }}>
                            <div className="course-card-title">Description</div>
                            <div className="course-card-content">
                                <div className="cardUI-body-content-desc" dangerouslySetInnerHTML={markup} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default CourseUI;

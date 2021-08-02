import moment from "moment";

import "./cardUI.css";

const CardUI = ({ data }) => {
    return (
        <div className="cardUI">
            <div>
                <div className="cardUI-header">{data.name}</div>
                <div className="cardUI-body">
                    <ul className="cardUI-body-content">
                        <li className="cardUI-body-content-item">
                            Description: Information about the activity here.Information about the activity here.Information about the activity here.
                        </li>
                        <li className="cardUI-body-content-item">Start Date: {moment(data.startTime).format("DD/MM/YYYY")}</li>
                        <li className="cardUI-body-content-item">End Date: {moment(data.endTime).format("DD/MM/YYYY")}</li>
                        <li className="cardUI-body-content-item">Duration: {data.duration}</li>
                        <li className="cardUI-body-content-item">Cost: {data.cost ? data.cost : "N/A"}</li>
                    </ul>
                </div>
            </div>

            <div className="cardUI-body-image" />
        </div>
    );
};

export default CardUI;

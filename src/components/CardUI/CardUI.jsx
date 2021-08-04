import moment from "moment";

import "./cardUI.css";

const CardUI = ({ data }) => {
    const markup = { __html: data.shortDescription };

    return (
        <div className="cardUI">
            <div>
                <div className="cardUI-header">{data.name.replace(/-.*$/, "")}</div>
                <div className="cardUI-body">
                    <ul className="cardUI-body-content">
                        <li className="cardUI-body-content-item">
                            {data.shortDescription ? (
                                // ? data.shortDescription.replace(/<[^>]+>/g, "")
                                <div className="cardUI-body-content-desc" dangerouslySetInnerHTML={markup} />
                            ) : null}
                        </li>
                        <li className="cardUI-body-content-item">Start Date: {moment(data.startTime).format("DD/MM/YYYY")}</li>
                        <li className="cardUI-body-content-item">Start Time: {moment(data.startTime).format("hh:mm A")}</li>
                        <li className="cardUI-body-content-item">Duration: {data.duration ? data.duration + " minutes" : "N/A"}</li>
                        <li className="cardUI-body-content-item">Cost: {data.cost ? data.cost : "N/A"}</li>
                    </ul>
                </div>
            </div>

            <div
                className="cardUI-body-image"
                style={{
                    backgroundImage: `url(${data.websiteImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    borderRadius: "5px",
                    height: "15rem",
                    minWidth: "10rem",
                }}
            />
        </div>
    );
};

export default CardUI;

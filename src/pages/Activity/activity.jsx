import ActivityUI from "../../components/ActivityUI/ActivityUI";
import RegisterUI from "../../components/RegisterUI/RegisterUI";

import "./activity.css";

const ActivityPage = () => {
    return (
        <section className="activity-page">
            <div className="activity-image" />

            <div>
                <ActivityUI />
                <RegisterUI />
            </div>
        </section>
    );
};

export default ActivityPage;

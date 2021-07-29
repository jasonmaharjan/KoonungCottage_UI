import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ActivityUI from "../../components/ActivityUI/ActivityUI";
import RegisterUI from "../../components/RegisterUI/RegisterUI";
import Spinner from "../../components/Spinner/spinner";

import "./activity.css";

const ActivityPage = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getEntry = async () => {
        const url = `https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivity/${id}`;
        const res = await axios.get(url);
        return res.data;
    };

    useEffect(async () => {
        const res = await getEntry();
        if (res) {
            setActivity(res);
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <section className="activity-page">
                    <div className="activity-image" />

                    <div className="activity-page-content">
                        <ActivityUI activity={activity} />
                        <RegisterUI />
                    </div>
                </section>
            )}
        </>
    );
};

export default ActivityPage;

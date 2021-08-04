import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CourseUI from "../../components/CourseUI/CourseUI";
import RegisterUI from "../../components/RegisterUI/RegisterUI";
import Spinner from "../../components/Spinner/spinner";

import "./course.css";

const CoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getEntry = async () => {
        const url = `https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getCourse/${id}`;
        const res = await axios.get(url);
        return res.data;
    };

    useEffect(async () => {
        const res = await getEntry();
        if (res) {
            setCourse(res);
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <section className="course-page">
                    <div
                        className="course-image"
                        style={{
                            backgroundImage: `url(${course["website-image"]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left",
                            backgroundSize: "cover",
                            borderRadius: "5px",
                        }}
                    />

                    <div className="course-page-content">
                        <CourseUI course={course} />
                        <RegisterUI courseData={course} />
                    </div>
                </section>
            )}
        </>
    );
};

export default CoursePage;

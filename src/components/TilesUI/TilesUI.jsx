import { Link } from "react-router-dom";
import CardUI from "../../components/CardUI/CardUI";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";

import CategoriesUI from "../../components/CategoriesUI/CategoriesUI";

import { Divider } from "antd";
import "./tiles.css";

const TilesUI = ({ activitiesData, categoriesData }) => {
    return (
        <section className="tilesUI">
            <section className="tilesUI-content">
                {/* <div className="tilesUI-title"> Activities</div> */}
                <div className="tilesUI-card">
                    {activitiesData.map((data) => (
                        <>
                            <CardUI data={data} />
                            <Link to={`/${data.id}`}>
                                <Button title="register" />
                            </Link>
                            <Divider color="#bebebe" />
                        </>
                    ))}
                </div>
            </section>

            <section className="categoriesUI">
                <div>Categories </div>
                <CategoriesUI categories={categoriesData} />
            </section>
        </section>
    );
};

export default TilesUI;

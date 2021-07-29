import "./spinner.css";

const Spinner = () => {
    return (
        <section className="spinner">
            <div className="spinner-overlay">
                <div className="spinner-container"></div>
                <div className="spinner-text">Fetching data ...Please wait</div>
            </div>
        </section>
    );
};

export default Spinner;

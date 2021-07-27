import { Switch, Route, Redirect } from "react-router-dom";

import FilterUI from "./components/FilterUI/FilterUI";
import TableUI from "./components/TableUI/TableUI";
import ActivityUI from "./components/ActivityUI/ActiityUI";
import RegisterUI from "./components/RegisterUI/RegisterUI";

import "./App.css";

const MainUI = () => {
    return (
        <>
            <FilterUI />
            <TableUI />
        </>
    );
};

function App() {
    return (
        <section className="main">
            <Switch>
                <Route path="/:id/register" component={RegisterUI} />
                <Route path="/:id" component={ActivityUI} />
                <Route path="/" component={MainUI} />
            </Switch>
        </section>
    );
}

export default App;

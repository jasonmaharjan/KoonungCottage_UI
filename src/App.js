import { Switch, Route, Redirect } from "react-router-dom";

import MainPage from "./pages/Main/main";
import ActivityPage from "./pages/Activity/activity";
import "./App.css";

function App() {
    return (
        <section className="main">
            <Switch>
                <Route path="/:id" component={ActivityPage} />
                <Route path="/" component={MainPage} />
            </Switch>
        </section>
    );
}

export default App;

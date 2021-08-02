import { Switch, Route, Redirect } from "react-router-dom";

import MainPage from "./pages/Main/main";
import ActivityPage from "./pages/Activity/activity";
import PaymentInfo from "./pages/PaymentInfo/paymentInfo";
import "./App.css";

function App() {
    return (
        <section className="main">
            <Switch>
                <Route path="/paymentInfo" component={PaymentInfo} />
                <Route path="/:id" component={ActivityPage} />
                <Route
                    path="/categories"
                    render={() => {
                        <MainPage />;
                    }}
                />
                <Route path="/" render={({ match, history }) => <MainPage match={match} history={history} />} />
            </Switch>
        </section>
    );
}

export default App;

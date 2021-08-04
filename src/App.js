import { Switch, Route, Redirect } from "react-router-dom";

import MainPage from "./pages/Main/main";
import ActivityPage from "./pages/Activity/activity";
import CoursePage from "./pages/Course/course";
//import PaymentInfo from "./pages/PaymentInfo/paymentInfo";

function App() {
    return (
        <section className="main">
            <Switch>
                <Route
                    path="/payment"
                    render={(params) => {
                        // console.log(params);
                        return (
                            <Redirect
                                to={{
                                    pathname: "/category",
                                    search: params.location.search,
                                }}
                            />
                        );
                    }}
                />
                <Route path="/category" component={MainPage} />
                <Route path="/activity/:id" component={ActivityPage} />
                <Route path="/course/:id" component={CoursePage} />
                <Route path="/" render={() => <Redirect to="/category" />} />
            </Switch>
        </section>
    );
}

export default App;

import * as React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import BaseComponent from "./pages/baseComponent";
import HomePageComponent from "./pages/homePageComponent";

const Routes = ({ location }: any) => {
    // Assign userId when user comes for first time and use same later
    const cookies = new Cookies;
    const currentUserId = cookies.get('userId');
    const userId = currentUserId ? currentUserId : Date.now() + '' + parseInt((Math.random() * 1234567) + '');
    cookies.set('userId', userId);

    return (
        <BaseComponent>
            <Switch location={location}>
                <Route path="/" exact component={HomePageComponent} />
            </Switch>
        </BaseComponent>
    );
};

export default withRouter(Routes);

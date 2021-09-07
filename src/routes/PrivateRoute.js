import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const status = useSelector(({ auth }) => auth.autoLogin);


    return (
        <Route {...rest}
            render={props => {
                if (status) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    );
                }
            }}
        />
    );
}

export default PrivateRoute;
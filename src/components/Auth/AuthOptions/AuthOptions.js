import React from 'react';
import { Button } from 'semantic-ui-react';
import "./AuthOptions.scss";

export default function AuthOptions(props) {
    const {setselectedForm} = props;

    return (
        <div className="auth-options">
            <h2>Thounsand songs Free on Music App</h2>
            <Button className="register" onClick={() => setselectedForm("register")}>
                Sign Up Free
            </Button>
            <Button className="login" onClick={() => setselectedForm("login")}>
                Login
            </Button>
        </div>
    )
}

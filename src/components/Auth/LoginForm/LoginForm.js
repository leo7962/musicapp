import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../utils/Validations';
import firebase from '../../../utils/Firebase';
import 'firebase/auth';
import './LoginForm.scss';

export default function LoginForm(props) {
    const { setSelectedForm } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = () => {
        setFormError({});
        let errors = {};
        let formOk = true;
        console.log("Login...");
    }

    return (
        <div className="login-form">
            <h1>¡Music for everyone around the world!</h1>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        icon="mail outline"
                    //error=()              
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        error={formError.password}
                        icon={
                            showPassword ? (
                                <Icon name="eye slash outline" link onClick={handlerShowPassword} />
                            ) : (
                                    <Icon name="eye" link onClick={handlerShowPassword} />
                                )
                        }
                    />
                </Form.Field>
                <Button type="submit">
                    Log in
                </Button>
            </Form>

            <div className="login-form__options">
                <p onClick={() => setSelectedForm(null)}>Back</p>
                <p>
                    You don't have an Account?{" "}
                    <span onClick={() => setSelectedForm("register")}>Sign up</span>
                </p>
            </div>
        </div>
    );
}

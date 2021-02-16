import React from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { validateEmail } from '../../../utils/Validations';
import { toast } from "react-toastify";
import firebase from '../../../utils/Firebase';
import 'firebase/auth';
import './RegisterForm.scss';
import { useState } from 'react';

export default function RegisterForm(props) {
    const { setSelectedForm } = props;
    const [formData, setFormData] = useState(defaultValueForm());
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState({});
    const [isloading, setIsLoading] = useState(false)

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = () => {

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!validateEmail(formData.email)) {
            errors.email = true;
            formOk = false;
        }

        if (formData.password.length < 6) {
            errors.password = true;
            formOk = false;
        }

        if (!formData.username) {
            errors.username = true;
            formOk = false;
        }

        setFormError(errors);

        if (formOk) {
            setIsLoading(true);
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(() => {                
                changeUserName();
                sendVerificationEmail();
            }).catch(() => {
                toast.error("Error to create an Account");
            }).finally(() => {
                setIsLoading(false);
                setSelectedForm(null);
            });
        }
    };

    const changeUserName = () => {
        firebase.auth().currentUser.updateProfile({
            displayName: formData.username
        }).catch(() => {
            toast.error("Error to change the Username");
        });
    }

    const sendVerificationEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            toast.success("Se ha enviado un email de verificaión");
        }).catch(() => {
            toast.error("Error to send the email of verification");
        });
    }

    return (
        <div className="register-form">
            <h1>Start to listen with a new account of MusicApp </h1>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Field>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        icon="mail outline"
                        error={formError.email}
                    />
                    {formError.email && (
                        <span className="error-text">
                            please, introduce a valid email
                        </span>
                    )}
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
                    {formError.password && (
                        <span className="error-text">
                            please, introduce a valid password and higher than 5 characters
                        </span>
                    )}
                </Form.Field>
                <Form.Field>
                    <Input
                        type="text"
                        name="username"
                        placeholder="New UserName"
                        icon="user circle outline"
                        error={formError.username}
                    />
                    {formError.username && (
                        <span className="error-text">
                            please, introduce a valid email
                        </span>
                    )}
                </Form.Field>
                <Button type="submit" loading={isloading}>Continue</Button>
            </Form>

            <div className="register-form__options">
                <p onClick={() => setSelectedForm(null)}>Come back</p>
                <p>
                    Do you have an Account? {" "}
                    <span onClick={() => setSelectedForm("login")}>Sign up</span>
                </p>
            </div>
        </div>
    );
}

function defaultValueForm() {
    return {
        email: "",
        password: "",
        username: ""
    };
}

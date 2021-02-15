import React, { useState } from 'react'
import AuthOptions from '../../components/Auth/AuthOptions';
import RegisterForm from '../../components/Auth/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm';
import BackgroundAuth from '../../assets/jpg/background-auth.jpg';
import LogoNameWhite from '../../assets/png/logo-name-white.png';
import './auth.scss';

export default function Auth() {

    const [selectedForm, setselectedForm] = useState(null);

    const handleForm = () => {
        switch (selectedForm) {
            case "login":
                return <LoginForm />;
            case "register":
                return <RegisterForm />;
            default:
                return <AuthOptions setselectedForm={setselectedForm} />;
        }
    };

    return (
        <div className="auth" style={{ background: `url(${BackgroundAuth})` }}>
            <div className="auth__dark" />
            <div className="auth__box">
                <div className="auth__box-logo">
                    <img src={LogoNameWhite} alt="MusicApp" />
                </div>
                {handleForm()}
            </div>
        </div>
    );
}

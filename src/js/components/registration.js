import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React, { useState } from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import CryptoApi from 'crypto-api/src/crypto-api';
import {useApi, useFormFields, usePost} from "../common/hook";
import {useSessionContext, getSessionCookie} from "../common/session";
import {onError} from "../common/error";
import TypeInput from "../components/typeInput";
import LoaderButton from "./loaderbutton";
import '../../scss/components/registration.scss';

function Registration(props) {
    const history = useHistory();
    const { userHasAuthenticated } = useSessionContext();
    const [api, index] = useApi(window.location.hostname, window.location.protocol, 'api');
    const ddhomeCountry = getSessionCookie('ddhomeCountry');
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState(null);

    const [fields, handleFieldChange] = useFormFields({
        username : '',
        password : '',
        confirmPassword: '',
        confirmationCode: ''
    });

    const submitRegistration = async (submitEvent) => {
        submitEvent.preventDefault();
        console.log(fields.username);
        if(validateForm()) {
            setIsLoading(true);

            try {
                const newUser = await Auth.signUp({
                    username: fields.username,
                    password: fields.password,
                });
                setIsLoading(false);
                setNewUser(newUser);
            } catch (e) {
                if (e.name === 'UsernameExistsException') {
                    alert (e.message);
                } else {
                    onError(e);
                }
                setIsLoading(false);
            }
        } else {
            alert('Please check your username and password requirement');
        }
    }

    const submitConfirmation = async (submitEvent) => {
        submitEvent.preventDefault();
        if(validateConfirmationForm()) {
            setIsLoading(true);
            try {
                await Auth.confirmSignUp(fields.username, fields.confirmationCode);
                await Auth.signIn(fields.username, fields.password);

                userHasAuthenticated(true);
                history.push("/");
            } catch (e) {
                onError(e);
                setIsLoading(false);
            }
        } else {
            alert('Please enter a proper confirmation code');
        }
    }

    const validateForm = () => {
        const emailRegex = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
        const passwordRegex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,}$');
        return fields.username.match(emailRegex)
            && fields.password.match(passwordRegex)
            && fields.password === fields.confirmPassword;
    }

    const validateConfirmationForm = () => {
        return fields.confirmationCode.length > 0;
    }

    const renderForm = () => {
        return (
            <>
                <div className="registrationcontainer">
                    <form key="LoginForm" name="LoginForm" onSubmit={submitRegistration}>
                        <div className="registrationfieldcontainer">
                            <TypeInput id="1"
                                       name="username"
                                       label="Username"
                                       type="email"
                                       disabled={false}
                                       required={true}
                                       maxLength={50}
                                       initialValue=""
                                       value={fields.username}
                                       placeHolder=""
                                       pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                       onChange={handleFieldChange} />
                        </div>
                        <div className="registrationfieldcontainer">
                            <TypeInput id="2"
                                       name="password"
                                       label="Password"
                                       type="password"
                                       disabled={false}
                                       required={true}
                                       initialValue=""
                                       value={fields.password}
                                       placeHolder=""
                                       pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
                                       onChange={handleFieldChange} />
                        </div>
                        <div className="registrationfieldcontainer">
                            <TypeInput id="2"
                                       name="confirmPassword"
                                       label="Confirm Password"
                                       type="password"
                                       disabled={false}
                                       required={true}
                                       initialValue=""
                                       value={fields.confirmPassword}
                                       placeHolder=""
                                       pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
                                       onChange={handleFieldChange} />
                        </div>
                    </form>
                </div>
                <div className="registrationbuttoncontainer">
                    <LoaderButton name="RegisterButton"
                                  label="Register"
                                  disabled={!validateForm}
                                  isLoading={isLoading}
                                  onClick={submitRegistration} />
                </div>
            </>
        )
    }

    const renderConfirmationForm = () => {
        return (
            <>
                <div className="registrationcontainer">
                    <form key="RegistrationForm" name="RegistrationForm" onSubmit={submitRegistration}>
                        <div className="registrationfieldcontainer">
                            <TypeInput id="1"
                                       name="confirmationCode"
                                       label="Confirmation Code"
                                       type="number"
                                       disabled={false}
                                       required={true}
                                       maxLength={20}
                                       initialValue=""
                                       value={fields.confirmationCode}
                                       placeHolder=""
                                       pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                       onChange={handleFieldChange} />
                        </div>
                    </form>
                </div>
                <div className="registrationbuttoncontainer">
                    <LoaderButton name="ConfirmCodeButton"
                                  label="Confirm Code"
                                  disabled={!validateConfirmationForm}
                                  isLoading={isLoading}
                                  onClick={submitConfirmation} />
                </div>
            </>
        )
    }

    return (
        <>
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </>
    )
}

export default withRouter(Registration);
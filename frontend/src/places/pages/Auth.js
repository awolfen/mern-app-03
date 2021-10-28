import React, { useContext, useState } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './Auth.css';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';


const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const loginModeHandler = (event) => {
        event.preventDefault();
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                },
                false
            )
        }
        setIsLoginMode(!isLoginMode);
    };

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        console.log("Log in: ");
        auth.login();
    };

    const registerSubmitHandler = (event) => {
        event.preventDefault();
        console.log("Register: ");
        auth.login();
    };

    return <Card className="authentication">
        <h2>{isLoginMode ? "Login Required" : "Register E-Mail"}</h2>
        <hr />
        <form className="form" onSubmit={isLoginMode ? loginSubmitHandler : registerSubmitHandler}>
            {!isLoginMode && (
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                >
                </Input>
            )}
            <Input
                id="email"
                element="input"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
            />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={isLoginMode ? [VALIDATOR_REQUIRE()] : [VALIDATOR_MINLENGTH(6)]}
                errorText={isLoginMode ? "Please enter a password." : "Your password must be at least 6 characters long."}
                onInput={inputHandler}
            />
            <Button inverse onClick={loginModeHandler}>{`switch to ${isLoginMode ? "sign up" : "login"}`}</Button>
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGN UP"}</Button>
        </form>
    </Card>
};

export default Auth;
import React, { useContext, useState } from 'react';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
                    name: undefined,
                    image: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },
                false
            )
        }

        setIsLoginMode(!isLoginMode);
    };

    const authSubmitHandler = async (event) => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                auth.login(responseData.user.id);
            } catch (err) {
                // empty catch block as errors are handled in sendRequest, this simply ensures no login on error
            }
        } else {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    { 'Content-Type': 'application/json' }
                );
                auth.login(responseData.user.id);
            } catch (err) {
                // empty catch block as errors are handled in sendRequest, this simply ensures no login on error
            }
        }

    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>{isLoginMode ? "Login Required" : "Register E-Mail"}</h2>
                <hr />
                <form className="form" onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />
                    )}
                    {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} />}
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
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? "LOGIN" : "SIGN UP"}</Button>
                    <Button inverse onClick={loginModeHandler}>{`switch to ${isLoginMode ? "sign up" : "login"}`}</Button>
                </form>
            </Card>
        </React.Fragment>
    )
};

export default Auth;
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const UpdatePlace = () => {
    const auth = useContext(AuthContext);
    const placeId = useParams().placeId;
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        false
    );

    //here useEffect prevents setFormData from an infitie loop when it changes the state
    useEffect(() => {
        const fetchLoadedPlace = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        },
                    },
                    true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLoadedPlace();
    }, [setFormData, placeId, sendRequest]);

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place.</h2>
                    <Button to={`/${auth.userId}/places`}>My Places</Button>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && formState.isValid &&
                (< form className="place-form" onSubmit={placeSubmitHandler}>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        value={formState.inputs.title.value}
                        valid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (minimum 5 characters)."
                        onInput={inputHandler}
                        value={formState.inputs.description.value}
                        valid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>UPDATE</Button>
                </form>)
            }
        </React.Fragment >
    );
};

export default UpdatePlace;
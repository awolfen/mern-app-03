import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';

const UserPlaces = () => {
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const [userPlaces, setUserPlaces] = useState();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/users/${userId}`);
                setUserPlaces(responseData.places);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserPlaces();
    }, [sendRequest, userId]);

    const deletePlaceHandler = (id) => {
        setUserPlaces(userPlaces.filter(place => place.id !== id));
    };

    if (!userPlaces) {
        return (
            <div className="center">
                <Card>
                    <h2>No places found.</h2>
                    <Button to='/places/new'>Add Place</Button>
                </Card>
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && userPlaces && <PlaceList items={userPlaces} onDeletePlace={deletePlaceHandler} />}
        </React.Fragment>
    )
};

export default UserPlaces;
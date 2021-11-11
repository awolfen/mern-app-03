import React, { useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './PlaceItem.css';

const PlaceItem = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const [showMap, setShowMap] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const openDeleteWarningHandler = () => setShowDeleteWarning(true);
    const closeDeleteWarningHandler = () => setShowDeleteWarning(false);

    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (err) {

        }
        setShowDeleteWarning(false);
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showDeleteWarning}
                onCancel={closeDeleteWarningHandler}
                header="Are you sure?"
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer=
                {
                    <React.Fragment>
                        {isLoading && <LoadingSpinner asOverlay />}
                        <Button inverse onClick={closeDeleteWarningHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Are you sure you would like to delete this place? This action cannot be undone.</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {(auth.userId === props.creatorId) && (<Button to={`/places/${props.id}`}>EDIT</Button>)}
                        {(auth.userId === props.creatorId) && (<Button danger onClick={openDeleteWarningHandler}>DELETE</Button>)}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
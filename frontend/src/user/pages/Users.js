import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
    const { isLoading, error, clearError, sendRequest } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');

                setLoadedUsers(responseData.users);
            } catch (err) {
            }
        };
        fetchUsers();
    }, [sendRequest]); // important to have callback on sendRequest to avoid dependency loops

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default Users;
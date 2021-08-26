import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Minsc',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Minsc.jpg/200px-Minsc.jpg',
            places: '2'
        }
    ];
    return (
        <React.Fragment>
            <h2>Users</h2>
            <UsersList items={USERS} />
        </React.Fragment>
    );
};

export default Users;
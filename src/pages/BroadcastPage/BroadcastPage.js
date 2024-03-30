import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BroadcastPage = () => {
    const [users, setUsers] = useState([]);
    const socket = io('http://localhost:8080');

    useEffect(() => {
        // Listen for the 'usersUpdated' event emitted by the server
        socket.on('usersUpdated', ({ gameCode, users }) => {
            setUsers(users);
        });

        // Cleanup the event listener when component unmounts
        return () => {
            socket.off('usersUpdated');
        };
    }, [socket]); // Dependency array ensures effect runs only once per socket connection

    return (
        <div>
            <h1>Broadcast Page</h1>
            <p>List of users joined:</p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default BroadcastPage;

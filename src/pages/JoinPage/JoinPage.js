import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const JoinPage = () => {
    const [gameCode, setGameCode] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);
    const socket = io('http://localhost:8080');

    const joinGameRoom = () => {
        if (!gameCode || !username) {
            setErrorMessage('Please enter both game code and username.');
            return;
        }
        socket.emit('joinGame', { gameCode, username });
    };

    // Event listener for receiving users who have joined the game
    useEffect(() => {
        socket.on('usersUpdated', (data) => {
            setUsers(data.users);
        });

        return () => {
            socket.off('usersUpdated');
        };
    }, [socket]);

    return (
        <div>
            <h1>Join the Quiz</h1>
            <p>Enter the game code and your username to join the quiz:</p>
            <input type="text" value={gameCode} onChange={(e) => setGameCode(e.target.value)} placeholder="Enter Game Code" />
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
            <button onClick={joinGameRoom}>Join Game</button>
            {errorMessage && <div>{errorMessage}</div>}
            <div>
                <h2>Users Joined:</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JoinPage;

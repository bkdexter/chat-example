import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const client = io();

const useSocket = (props) => {
    const [messages, setMessages] = useState([
        {
            room: "Server",
            sender: "Admin",
            msg: "Welcome to the Converstation..."
        }
    ]);

    useEffect(() => {
        client.on('chat message', (e) => {
            setMessages((prev) => {
                return [...prev, e];
            })
        });
    }, []);

    const setUsername = (text) => {
        client.emit('setuser', text);
    }

    const setStatus = (status) => {
        client.emit('setstatus', status);
    }

    const sendMessage = (text, options) => {
        client.emit('chat message', {
            room: options.room || 'general',
            msg: text
        })
    }

    const joinChannel = (name) => {

    }

    const leaveChannel = (name) => {

    }

    return {
        messages,
        setUsername,
        setStatus,
        sendMessage,
        joinChannel,
        leaveChannel,
    };
}

export default useSocket;
import React, { useCallback, useEffect, useState } from 'react';
import api from './api';
import './App.css';

const ChatBar = (props) => {

    const [text, setText] = useState('');

    const sendMessage = () => {
        // call onSend with message text
        props.onSend(text);

        // clear the input field
        setText('');
    }

    const textChangeHandler = (event) => {
        setText(event.target.value);
    }

    const keyHandler = (event) => {
        if (event.key === 'Enter') {
            if (!event.ctrlKey) {
                event.preventDefault();
                sendMessage();
            }
        }
    }

    return (
        <div className="bottom_bar">
            <input
                className="chatIn"
                autocomplete="off"
                placeholder="Message #general"
                value={text}
                onChange={textChangeHandler}
                onKeyPress={keyHandler}
            />
            <button className="send" onClick={sendMessage}>Send</button>
        </div>
    );
}

const MessageList = (props) => {
    const messages = props.messages || [];

    // format?  [HH:MM][room][username]: {message}
    const items = messages.map((message, index) => {
        return (
            <li key={index}>
                <span>[{message.room}]</span><span>[{message.sender}]</span> <span>{message.msg}</span>
            </li>
        );
    });

    return (
        <ul className="messages">
            {items}
        </ul>
    );
}

const App = (_props) => {
    const [messages, setMessages] = useState([
        {
            room: "Server",
            sender: "Admin",
            msg: "Welcome to the Converstation..."
        }
    ]);

    useEffect(() => {
        api.on('chat message', (e) => {
            setMessages((prev) => {
                return [...prev, e];
            })
            //window.scrollTo(0, document.body.scrollHeight);
        });
    }, []);

    const sendMessage = (text) => {
        api.emit('chat message', {
            room: 'general',
            msg: text
        });
    }

    return (
        <div>
            <MessageList messages={messages} />
            <ChatBar onSend={sendMessage} />
        </div>
    );
}

export default App;
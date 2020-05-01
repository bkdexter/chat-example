import React, { useCallback, useEffect, useState, useRef } from 'react';
import useSocket from './useSocket';
import './App.css';

const UsernameRequest = (props) => {
    const [text, setText] = useState('');

    const textChangeHandler = (event) => {
        setText(event.target.value);
    }

    const keyHandler = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.onAction(text);
        }
    }

    return (
        <div className="usernameIn input_bar">
            <input
                className="lineIn"
                autocomplete="off"
                placeholder={props.placeHolder}
                value={text}
                onChange={textChangeHandler}
                onKeyPress={keyHandler}
            />
            <button className="send" onClick={props.onAction}>{props.actContent}</button>
        </div>
    );
}

const ChatBar = (props) => {

    const [text, setText] = useState('');
    const inRef = useRef();

    useEffect(() => {
        inRef.current.focus();
    }, [inRef]);

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
        <div className="bottom_bar input_bar">
            <input
                ref={inRef}
                className="lineIn"
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
    const client = useSocket();

    const [username, setUsername] = useState(undefined);

    const sendMessage = (text) => {
        client.sendMessage(text, {room: 'general'});
    }

    const specifyUsername = (text) => {
        setUsername(text);
        client.setUsername(text);
    }

    if (!username) {
        return (
            <div>
                <UsernameRequest
                placeHolder="Enter a username"
                 actContent="Go!"
                 onAction={specifyUsername}
                 />
            </div>
        )
    }

    return (
        <div>
            <MessageList messages={client.messages} />
            <ChatBar onSend={sendMessage} />
        </div>
    );
}

export default App;
# chat-example

This started as a very simple chat example used for
the [Getting Started](http://socket.io/get-started/chat/) guide
of the Socket.IO website.

Added features:
- support nicknames


TODO ideas
- ensure nickname unique
- broadcast connect/disconnect of named users
- don't send messages from server to client that sent it. instead, append the message directly to the chat as soon as sent to server.
- add "{user} is typing..." feature
- show list of online users
- add private messaging (/whisper)
- add various addressable channels. default to #general
- add timestamp to messages
- support emojis
- support reactions to messages (thumbs up/down, smile, frown, etc)

```
  msg formats:
        User joins a channel:
            Joined channel: [{channel name}]
        User leaves channel:
            Left channel: [{channel name}]
        Msg in channel:
            {timestamp} [{channel name}] [{sender}]: {message}
        Friend comes online:
            {username} has come online.
        Friend goes offline:
            {username} has gone offline.
        Whisper received by user:
            [{sender}] whispers: {message}
        Whisper sent by user:
            To [{recipient}]: {message}
```
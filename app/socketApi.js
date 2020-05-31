import io from 'socket.io-client';

// all socket calls go in this file

const socket = io('http://localhost:5001', { forceBase64: true }); // don't know why this base64 thing is needed but it is

export const sendChatMessage = (text, authorId, hallwayId) => {
    console.log("emitting chat message")
    socket.emit("chat", {text, authorId, hallwayId});
}
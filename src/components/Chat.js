import React, { useEffect, useState } from 'react'
import '../css/chat.css'
import { Avatar, IconButton } from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase/compat/app';

function Chat() {

    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('');
    const { roomid } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue('')


    useEffect(() => {
        if (roomid) {
            db.collection('rooms').doc(roomid).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomid).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    }, [roomid])


    useEffect(() => {

        setSeed(Math.floor(Math.random() * 5000));

    }, [roomid]);

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomid).collection('messages').add({

            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })


        setInput('');
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className='chat__headerInfo'>
                    <h3 className='chat-room-name'>
                        {roomName}
                    </h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                                timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map(message => (
                    <p className={`chat__message ${message.name == user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name} : </span>
                        {message.message}
                        <span className="chat__timestemp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}

            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit"> Send a Message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
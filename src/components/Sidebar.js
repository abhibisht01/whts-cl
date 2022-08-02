import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import Avatar from '@mui/material/Avatar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';


function Sidebar() {
    const [{ user }, dispatch] = useStateValue();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({

                id: doc.id,
                data: doc.data()
            })

            ))
        ));

        return () => {
            unsubscribe();
        }

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />

                {
                    rooms.map(room => (
                        <SidebarChat key={room.id}
                            id={room.id}
                            name={room.data.name}

                        />
                    ))
                }



            </div>
        </div>
    );
}

export default Sidebar;

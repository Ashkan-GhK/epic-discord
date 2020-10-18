import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';


const Sidebar = () => {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot((snapshot) => 
            setChannels(
            snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            }))
          )
        );
    }, []);

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name");

        if(channelName) {
            db.collection("channels").add({
                channelName: channelName,
            });
        }
    };


    return (
        <div className="sidebar">
           <div className="sidebar-top">
               <h3>Ashkan Ghk</h3>
               <ExpandMoreIcon />
           </div> 

           <div className="sidebar-channels">
               <div className="sidebar-channelHeader">
                   <div className="sidebar-header">
                   <ExpandMoreIcon />
                   <h4>Text Channels</h4>
                   </div>

               <AddIcon 
               onClick={handleAddChannel} 
               className="sidebar-addChannel" />
           </div>
           <div className="sidebar-channelList">
               {channels.map(({ id, channel}) =>(
                   <SidebarChannel key={id} id={id} channelName={channel.channelName} />
               ))}
           </div>
           </div>  

           <div className="sidebar-voice">
               <SignalCellularAltIcon
                 className="sidebar-voiceIcon"
                 fontSize="large"
                />
                <div className="sidebar-voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar-voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
           </div>
           <div className="sidebar-profile">
               <Avatar 
               onClick={() => auth.signOut()}  
               src={user.photo} />
               <div className="sidebar-profileInfo">
                   <h3>{user.displayName}</h3>
                   <p>#{user.uid.substring(0, 5)}</p>
               </div>
               <div className="sidebar-profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
               </div>
           </div>
        </div>
        
    );
}

export default Sidebar;
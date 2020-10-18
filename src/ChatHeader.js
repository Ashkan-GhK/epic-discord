import React from 'react';
import './ChatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';

const ChatHeader = ({ channelName }) => {
    

    return (
        <div className="chatHeader">
            <div className="chatHeader-left">
                <h3><span className="chatHeader-hash">#</span>
                {channelName}
                </h3>
                
            </div>
            <div className="chatHeader-right">
                <NotificationsIcon />
                <EditLocationIcon />
                <PeopleAltRoundedIcon />

                <div className="chatHeader-search">
                    <input placeholder="search" />
                    <SearchRoundedIcon />
                </div>
                <SendRoundedIcon />
                <HelpRoundedIcon />
            </div>
        </div>
    )
}

export default ChatHeader;

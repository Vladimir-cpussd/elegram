import React from "react";
import './chats.css';
import SideBar from "./sidebar/sidebar";
import ChatList from "./chatlist/chatlist";
import ChatWindow from "./chatwindow/chatwindow";

function Chats() {
    return (
        <>
            <div className="main">
                
                <SideBar/>
                <ChatList/>
                <ChatWindow/>
            </div>
        </>
    )
}

export default Chats;
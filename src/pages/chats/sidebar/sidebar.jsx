import React from "react";
import '../chats.css';

function SideBar() {
    const hello = () => {
        console.log('hello')
    }
    return (
        <>
            <div className="sidebar">
                <div
                    className="sidebar-catalog"
                    onClick={hello}    
                >
                    <p>нейросеть</p>
                    <p>xyeta</p>
                </div>
                <p>chat2</p>
                <p>chat3</p>
            </div>
        </>
    )
}

export default SideBar;
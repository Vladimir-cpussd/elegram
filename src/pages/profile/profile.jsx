
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './profile.css';


function Settings() {
    const navigate = useNavigate(); // Сначала получить функцию
        
        // Правильное использование:
        const goToChats = () => {
            navigate('/chats');
        };
    return(
        <>  
            <div className="settings">
                <p>settings</p>
                <button onClick={goToChats}>чаты</button>
            </div>
        </>
    )
}

export default Settings;
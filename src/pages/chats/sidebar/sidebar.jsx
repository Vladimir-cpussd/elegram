
import '../chats.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate(); // Сначала получить функцию
    
    // Правильное использование:
    const goToProfile = () => {
        navigate('/settings');
    };
    
    const cons = console.log("выбран чат");
    const chats = [
        { id: 1, name: 'Вася', lastMessage: 'Привет' },
        { id: 2, name: 'Петя', lastMessage: 'Как дела?' },
        { id: 3, name: 'Маша', lastMessage: 'Пока' },
        { id: 4, name: 'Коля', lastMessage: 'Ок' },
        { id: 5, name: 'Анна', lastMessage: 'Спишь?' },
        { id: 6, name: 'Сергей', lastMessage: 'Деньги перевел' },
        { id: 7, name: 'Ирина', lastMessage: 'Встретимся завтра' },
        { id: 8, name: 'Дмитрий', lastMessage: 'Спасибо' },
        { id: 9, name: 'Ольга', lastMessage: 'Фото скинула' },
        { id: 10, name: 'Михаил', lastMessage: 'Где ты?' },
        { id: 11, name: 'Елена', lastMessage: 'Жду' },
        { id: 12, name: 'Елена', lastMessage: 'Жду' },
        { id: 13, name: 'Елена', lastMessage: 'Жду' },
        { id: 14, name: 'Елена', lastMessage: 'Жду' },
        { id: 15, name: 'Елена', lastMessage: 'Жду' },
        { id: 16, name: 'Елена', lastMessage: 'Жду' },
        { id: 17, name: 'Елена', lastMessage: 'Жду' },
        { id: 18, name: 'Алексей', lastMessage: 'Перезвони' }
    ];

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <button 
                    onClick={goToProfile}
                    className='profile'
                    >
                        профиль
                </button>
                {chats.map(chat => (
                    <div 
                    key={chat.id} 
                    className="chat-item"
                    onClick={cons}
                    >
                        <h3 className="chat-name">{chat.name}</h3>
                        <div className="chat-last">{chat.lastMessage}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;
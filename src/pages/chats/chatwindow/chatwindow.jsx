import React, { useState } from "react"; // Добавлен импорт useState
import '../chats.css';

function ChatWindow() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            console.log('Сообщение:', message);
            // Здесь будет отправка сообщения
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        // Если нажат Ctrl+Enter или Cmd+Enter - отправляем
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleSubmit(e);
        }
        // Обычный Enter будет делать перенос строки
    };

    return (
        <>
            <div className="chatwindow">
                <div className="chatwindow-title">
                    {/* Добавьте заголовок чата */}
                </div>
                <div className="chatwindow-dialog">
                    <p className="start-message">выберите диалог</p>
                </div>
                <div className="chatwindow-input">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            
                            placeholder="Напишите сообщение..."
                            className="chat-textarea" // Добавлен класс для стилизации
                        />
                        <button type="submit" className="send-button">
                            Отправить
                        </button>
                        
                    </form>
                    
                </div>
            </div>
        </>
    );
}

export default ChatWindow;
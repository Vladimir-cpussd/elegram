import React, { useState } from "react";
import '../autorization/autorization.css'

function Restoration() {
    // useState для управления состоянием кода
    const [showCode, setShowCode] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    
    // Обработчик отправки кода
    const handleSendCode = () => {
        // Проверяем номер телефона
        if (phoneNumber.length >= 10) {
            setShowCode(true);
            console.log('Код отправлен на номер:', phoneNumber);
            
            // Здесь можно добавить запрос на сервер для отправки кода
            // Пример: sendVerificationCode(phoneNumber);
        } else {
            alert('Пожалуйста, введите корректный номер телефона');
        }
    };
    
    // Обработчик подтверждения кода
    const handleVerifyCode = () => {
        if (verificationCode.length >= 4) {
            console.log('Код подтвержден:', verificationCode);
            // Здесь можно добавить проверку кода на сервере
            // Пример: verifyCode(phoneNumber, verificationCode);
        } else {
            alert('Введите код подтверждения');
        }
    };
    
    // Форматирование номера телефона (опционально)
    const formatPhoneNumber = (value) => {
        // Удаляем все нецифровые символы
        const cleaned = value.replace(/\D/g, '');
        
        // Форматируем номер: +7 (XXX) XXX-XX-XX
        let formatted = cleaned;
        if (cleaned.length > 0) {
            formatted = '+7 ';
            if (cleaned.length > 1) {
                formatted += `(${cleaned.substring(1, 4)}`;
            }
            if (cleaned.length > 4) {
                formatted += `) ${cleaned.substring(4, 7)}`;
            }
            if (cleaned.length > 7) {
                formatted += `-${cleaned.substring(7, 9)}`;
            }
            if (cleaned.length > 9) {
                formatted += `-${cleaned.substring(9, 11)}`;
            }
        }
        
        return formatted;
    };
    
    return (
        <div className="autorization-box">
            <h2>Восстановление пароля</h2>
            
            {!showCode ? (
                // Форма ввода номера телефона
                <>
                    <div className='autorization-box-input'>
                        <input 
                            type="tel"
                            placeholder="+7 (XXX) XXX-XX-XX"
                            value={phoneNumber}
                            onChange={(e) => {
                                const formattedNumber = formatPhoneNumber(e.target.value);
                                setPhoneNumber(formattedNumber);
                            }}
                        />
                    </div>
                    
                    <button
                        className="button primary"
                        onClick={handleSendCode}
                    >
                        Отправить код
                    </button>
                </>
            ) : (
                // Форма ввода кода подтверждения
                <>
                    <p>Код отправлен на номер: {phoneNumber}</p>
                    
                    <div className='autorization-box-input'>
                        <input 
                            type="text"
                            placeholder="Введите код из SMS"
                            value={verificationCode}
                            onChange={(e) => {
                                // Разрешаем только цифры
                                const code = e.target.value.replace(/\D/g, '');
                                setVerificationCode(code);
                            }}
                            maxLength="4"
                        />
                    </div>
                    
                    <button
                        className="button primary"
                        onClick={handleVerifyCode}
                    >
                        Подтвердить код
                    </button>
                    
                    <button
                        className="button secondary"
                        onClick={() => setShowCode(false)}
                        style={{ marginTop: '10px' }}
                    >
                        Изменить номер
                    </button>
                    
                    <button
                        className="button link"
                        onClick={handleSendCode}
                        style={{ marginTop: '10px' }}
                    >
                        Отправить код повторно
                    </button>
                </>
            )}
        </div>
    );
}

export default Restoration;
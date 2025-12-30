import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/button/button";
import '../autorization/autorization.css';
import { useNavigate } from 'react-router-dom';

// Базовый URL API
const API_BASE_URL = "http://10.243.22.63:8000/"; 

function Registration() {
    const navigate = useNavigate();
    // Состояние для всех полей формы
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Обработчик изменения полей ввода
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Валидация формы
    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Имя обязательно для заполнения");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email обязателен для заполнения");
            return false;
        }
        if (!formData.password) {
            setError("Пароль обязателен для заполнения");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают");
            return false;
        }
        if (formData.password.length < 6) {
            setError("Пароль должен содержать минимум 6 символов");
            return false;
        }
        return true;
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Валидация
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Подготавливаем данные для отправки
            const dataToSend = {
                name: formData.name,
                username: formData.username,
                phone: formData.phone,
                email: formData.email,
                password: formData.password
                
            };

            console.log("Отправляемые данные:", dataToSend);

            // Отправляем POST запрос на сервер
            const response = await axios.post(`${API_BASE_URL}v1/auth/register`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Ответ от сервера:", response.data);

            // Обработка успешного ответа
            if (response.status === 201 || response.status === 200) {
                setSuccess(true);
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                // Можно перенаправить пользователя
                navigate('/'); // если используете react-router
                
                // Сбросить форму
                setFormData({
                    name: '',
                    username: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });

                alert("Регистрация прошла успешно!");
            }

        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            
            // Обработка ошибок Axios
            if (error.response) {
                // Сервер ответил с ошибкой
                console.error("Статус ошибки:", error.response.status);
                console.error("Данные ошибки:", error.response.data);
                
                if (error.response.data.message) {
                    setError(`Ошибка: ${error.response.data.message}`);
                } else if (error.response.data.error) {
                    setError(`Ошибка: ${error.response.data.error}`);
                } else {
                    setError("Ошибка сервера. Попробуйте позже.");
                }
            } else if (error.request) {
                // Запрос был отправлен, но ответа нет
                setError("Нет ответа от сервера. Проверьте подключение.");
            } else {
                // Ошибка при настройке запроса
                setError("Ошибка при отправке запроса: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="autorization-box" onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            
            {error && (
                <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>
                    Регистрация прошла успешно!
                </div>
            )}
            
            <div className="autorization-box-input">
                <p>Имя</p>
                <input
                    type="text"
                    name="name"
                    maxLength={30}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                
                <p>Никнейм</p>
                <input
                    type="text"
                    name="username"
                    maxLength={15}
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                />
                
                <p>Телефон</p>
                <input
                    type="tel"
                    name="phone"
                    maxLength={11}
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                />
                
                <p>Почта</p>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                
                <p>Пароль</p>
                <input
                    type="password" 
                    name="password"
                    maxLength={15}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                
                <p>Подтвердите пароль</p>
                <input
                    type="password" 
                    name="confirmPassword"
                    max={15}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </div>
            
            <Button 
                type="submit" 
                variant="secondary"
                disabled={loading}
            >
                {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
        </form>
    );
}

export default Registration;
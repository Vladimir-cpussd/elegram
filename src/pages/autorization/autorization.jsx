import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from "../../components/button/button";
import "./autorization.css"; 
import Registration from '../registration/registration';
import Restoration from '../restoration/restoration';

// Базовый URL API
const API_BASE_URL = "http://10.243.22.63:8000/";

function Autorization() {
  const [data, setData] = useState([]);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegistrationWindow, setShowRegistrationWindow] = useState(false);
  const [showRestorationWindow, setShowRestorationWindow] = useState(false);

  const navigate = useNavigate();

  // Функция для проверки пользователя на сервере
  const handleLogin = async () => {
    // Валидация
    if (!login.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log("Отправка данных для авторизации:", { login, password });
      
      // Отправляем запрос на сервер
      const response = await axios.post(`${API_BASE_URL}v1/auth/login`, {
        username: login, // или email, в зависимости от того, что ожидает сервер
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Ответ от сервера:", response.data);

      // Проверяем успешность ответа
      if (response.status === 200) {
        console.log("Успешная авторизация!");
        
        // Сохраняем токен в localStorage
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        // Перенаправляем на страницу чатов
        navigate('/chats');
      }

    } catch (error) {
      console.error("Ошибка при авторизации:", error);
      
      // Обработка ошибок
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        console.error("Статус ошибки:", status);
        console.error("Данные ошибки:", data);
        
        if (status === 401) {
          setError("Неверный логин или пароль");
        } else if (status === 400) {
          setError(data.message || "Некорректные данные");
        } else if (status === 404) {
          setError("Пользователь не найден");
        } else if (status >= 500) {
          setError("Ошибка сервера. Попробуйте позже.");
        } else {
          setError("Ошибка при авторизации");
        }
      } else if (error.request) {
        setError("Нет ответа от сервера. Проверьте подключение.");
      } else {
        setError("Ошибка при отправке запроса: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Обработчик нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Тестовый запрос для получения данных (можно оставить или удалить)
  const getData = async () => {
    console.log('Вызов getData — начинаю запрос к серверу');
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      console.log('Ответ получен, статус:', response.status);
      console.log('Данные с сервера:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при Fetch:', error);
    }
  };

  useEffect(() => {
    // Проверяем, есть ли сохраненный токен
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Найден сохраненный токен, можно автоматически авторизовать");
      // Можно добавить автоматическую проверку токена
    }
    
    // getData(); // Можно убрать, если не нужно тестировать соединение
  }, []);

  // Переключаемся на окна регистрации/восстановления
  if (showRegistrationWindow) {
    return <Registration />;
  } else if (showRestorationWindow) {
    return <Restoration />;
  }

  return (
    <div className='autorization-box'>
      <h2>Авторизация</h2>
      
      {/* Сообщение об ошибке */}
      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          marginBottom: '10px',
          padding: '8px',
          backgroundColor: '#ffe6e6',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      
      <div className='autorization-box-input'>
        <input
          type="text"
          placeholder="Введите логин или email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>
      
      <Button 
        onClick={handleLogin} 
        variant="primary"
        disabled={loading}
      >
        {loading ? "Вход..." : "Продолжить"}
      </Button>
      
      <Button 
        onClick={() => setShowRegistrationWindow(true)} 
        variant="secondary"
        disabled={loading}
      >
        Регистрация
      </Button>
      
      <Button 
        onClick={() => setShowRestorationWindow(true)} 
        variant="third"
        disabled={loading}
      >
        Забыли пароль?
      </Button>
      
      {/* Кнопка для тестирования соединения (можно удалить в продакшене) */}
      <button
        onClick={() => {
          console.log('Кнопка "Тест соединения" нажата');
          getData();
        }}
        style={{
          marginTop: '20px',
          padding: '5px 10px',
          fontSize: '12px',
          opacity: 0.7
        }}
      >
        Тест соединения
      </button>

      {/* Для отладки: показываем текущие данные (можно удалить в продакшене) */}
      {data && (
        <div style={{ 
          marginTop: '20px', 
          fontSize: '10px', 
          opacity: 0.5,
          maxHeight: '100px',
          overflow: 'auto'
        }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Autorization;
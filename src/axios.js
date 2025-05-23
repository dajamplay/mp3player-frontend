import axios from 'axios';

// Создаем экземпляр axios с базовой настройкой
const apiClient = axios.create({
    // baseURL: 'http://localhost/wp-json/custom/v1/', // Базовый URL REST API WordPress
    baseURL: 'https://music.maks-site.ru/wp-json/custom/v1/', // Базовый URL REST API WordPress
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем перехватчик запросов для динамического добавления токена
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Получаем токен при каждом запросе
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Перехват ответов
apiClient.interceptors.response.use(
    (response) => {
        // Успешный ответ
        return response;
    },
    (error) => {
        // Обработка ошибки
        if (error.response) {
            // Сервер вернул ответ с ошибкой (например, 404, 500)
            console.error(`Ошибка ${error.response.status}: ${error.response.data.message || 'Неизвестная ошибка'}`);
        } else if (error.request) {
            // Запрос был отправлен, но ответ не получен
            console.error('Нет ответа от сервера:', error.request);
        } else {
            // Ошибка настройки
            console.error('Ошибка настройки запроса:', error.message);
        }

        // Пробрасываем ошибку дальше, чтобы ее можно было обработать в компонентах
        return Promise.reject(error);
    }
);

// Обработка токена (если используется авторизация)
// apiClient.defaults.headers.common['Authorization'] = 'Bearer <YOUR_TOKEN>';

export default apiClient;

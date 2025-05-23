import apiClient from '@/axios';

export const validateToken = async (token) => {
    try {
        const response = await apiClient.post('/validate-token', { token });

        if (response.data.status === 'success' && response.data.user) {
            console.log('Успешная авторизация:', response.data.user);
            return response.data.user;
        } else {
            console.error('Не удалось получить ID пользователя.');
            return false;
        }
    } catch (error) {
        console.error(
            'Ошибка авторизации:',
            error.response?.data?.message || 'Неизвестная ошибка'
        );
        return false;
    }
};

export const getToken = async (username, password) => {
    try {
        const response = await apiClient.post('/token', {
            username,
            password,
        });

        if (response.data.status === 'success' && response.data.token) {
            console.log('Успешное получение токена:', response.data.token);
            return response.data.token;
        } else {
            console.error('Не удалось получить токен.');
            return false;
        }
    } catch (error) {
        console.error(
            'Ошибка получения токена:',
            error.response?.data?.message || 'Неизвестная ошибка'
        );
        return false;
    }
};

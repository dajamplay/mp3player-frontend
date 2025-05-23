import apiClient from '@/axios';

export const fetchTracks = async () => {
    try {
        const response = await apiClient.get('/tracks');

        if (response.data.status === 'success' && response.data.tracks.length > 0) {
            console.log('Треки получены:', response.data);
            return response.data.tracks;
        }

        console.error('Не удалось получить треки.');
        return false;
    } catch (error) {
        console.error(
            'Ошибка при получении треков:',
            error.response?.data?.message || error.message
        );
        return false;
    }
};
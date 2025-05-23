import apiClient from "@/axios.js";
import {emitter} from "@/emitter.js";

export const fetchQueue = async () => {
    try {
        const response = await apiClient.get('/queue');

        if (response.data.status === 'success' && response.data.queue) {
            console.log('Очередь получена:', response.data.queue);
            return response.data.queue;
        }

        console.error('Не удалось получить треки.');
        return false;
    } catch (error) {
        console.error('Ошибка при получении очереди:', error.response?.data?.message || error.message);
        return false;
    }
};

export const updateQueue = async (queue) => {
    try {
        const response = await apiClient.post('/queue', {queue: queue});
        console.log('Очередь успешно сохранена:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при сохранении очереди:', error.response?.data?.message || error.message);
        throw error;
    }
};

//
export const removeTrackFromQueue = async (track_queue_id) => {
    try {
        const response = await apiClient.delete("/queue/track", {
            data: {track_queue_id}
        });

        if (response.data.status === 'success') {
            console.log('Трек удален из очереди');
            emitter.emit('notify', { message: "Трек удален из очереди" });
            return true;
        }
    } catch (error) {
        console.error('Ошибка удаления трека из очереди.');
        emitter.emit('notify', { message: "Ошибка удаления трека из очереди.", type: 'danger'});
        return false;
    }
};
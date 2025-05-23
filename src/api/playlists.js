import apiClient from "@/axios.js";
import {emitter} from "@/emitter.js";

export const fetchPlaylists = async () => {
    try {
        const response = await apiClient.get('/playlists');

        if (response.data.status === 'success' && response.data.playlists.length > 0) {
            console.log('Плейлистов получены:', response.data.playlists);
            return response.data.playlists;
        }

        console.error('Не удалось получить плейлисты.');
        return false;
    } catch (error) {
        console.error('Ошибка при получении плейлистов:', error.response?.data?.message || error.message);
        return false;
    }
};

export const createPlaylist = async (title) => {
    try {
        const response = await apiClient.post('/create-playlist', {title});
        console.log('Плейлист успешно создан:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при создании плейлиста:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const deletePlaylist = async (playlistId) => {
    try {
        const response = await apiClient.delete(`/delete-playlist/${playlistId}`);
        console.log('Плейлист удален:', response.data);
        emitter.emit('notify', { message: "Плейлист удален" });
        return true;
    } catch (error) {
        emitter.emit('notify', { message: 'Ошибка удаления плейлиста' , type: "warning"});
        console.error('Ошибка при удалении плейлиста:', error.response?.data?.message || error.message);
        return false;
    }
};

export const addTrackToPlaylist = async (playlistId, trackId) => {
    try {
        const response = await apiClient.post(`/add-track-to-playlist/${playlistId}`, {
            track_id: trackId, // Передача ID трека в теле запроса
        });
        emitter.emit('notify', { message: "Трек добавлен в плейлист" });
        return true;
    } catch (error) {
        emitter.emit('notify', { message: error.response?.data?.message , type: "warning"});
        return false;
    }
};

export const removeTrackFromPlaylist = async (playlistId, trackId) => {
    try {
        const response = await apiClient.delete(`/remove-track-from-playlist/${playlistId}`, {
            data: {
                track_id: trackId, // Передача ID трека в теле запроса
            },
        });
        console.log('Трек удален из плейлиста:', response.data);
        return true;
    } catch (error) {
        console.error('Ошибка при удалении трека из плейлиста:', error.response?.data?.message || error.message);
        return false;
    }
};

export const renamePlaylist = async (playlistId, newTitle) => {
    try {
        const response = await apiClient.put(`/rename-playlist/${playlistId}`, {
            new_title: newTitle,
        });
        emitter.emit('notify', { message: "Плейлист успешно переименован" });
        return true;
    } catch (error) {
        emitter.emit('notify', {
            message: error.response?.data?.message || "Ошибка при переименовании плейлиста",
            type: "warning"
        });
        return false;
    }
};


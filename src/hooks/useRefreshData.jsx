import { useRecoilState } from 'recoil';
import { queueAtom, playlistsAtom, libraryAtom } from '@/atoms.js';
import {fetchQueue} from "@/api/queue.js";
import {fetchPlaylists} from "@/api/playlists.js";
import {fetchTracks} from "@/api/library.js"; // Импорты атомов состояния

export const useRefreshData = () => {
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [playlists, setPlaylists] = useRecoilState(playlistsAtom);
    const [library, setLibrary] = useRecoilState(libraryAtom);

    const refreshQueue = async () => {
        try {
            const newQueue = await fetchQueue();
            setQueue(newQueue);
            console.log('Очередь успешно обновлена');
        } catch (error) {
            console.error('Ошибка обновления очереди:', error);
        }
    };

    const refreshPlaylists = async () => {
        try {
            const newPlaylists = await fetchPlaylists();
            setPlaylists(newPlaylists);
            console.log('Плейлисты успешно обновлены');
        } catch (error) {
            console.error('Ошибка обновления плейлистов:', error);
        }
    };

    const refreshLibrary = async () => {
        try {
            const newLibrary = await fetchTracks();
            setLibrary(newLibrary);
            console.log('Библиотека успешно обновлена');
        } catch (error) {
            console.error('Ошибка обновления библиотеки:', error);
        }
    };

    return {
        refreshQueue,
        refreshPlaylists,
        refreshLibrary,
    };
};

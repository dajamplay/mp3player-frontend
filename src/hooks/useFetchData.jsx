import { useEffect } from "react";
import { fetchPlaylists } from "@/api/playlists.js";
import {fetchQueue} from "@/api/queue.js";
import {fetchTracks} from "@/api/library.js";

export function useFetchData(setLibrary, setPlaylists, setQueue, user) {

    useEffect(() => {
        if (user) {
            const fetchLibraryFromServer = async () => {
                try {
                    const tracks = await fetchTracks();
                    if (tracks) setLibrary(tracks);
                } catch (error) {
                    console.error("Ошибка при загрузке треков:", error);
                }
            };

            const fetchPlaylistsFromServer = async () => {
                try {
                    const playlists= await fetchPlaylists();
                    if (playlists) setPlaylists(playlists);
                } catch (error) {
                    console.error("Ошибка при загрузке плейлистов:", error);
                }
            };

            const fetchQueueFromServer = async () => {
                try {
                    let queue = await fetchQueue();
                    if (queue) setQueue(queue);
                } catch (error) {
                    console.error("Ошибка при загрузке очереди:", error);
                }
            };

            fetchLibraryFromServer();
            fetchPlaylistsFromServer();
            fetchQueueFromServer();
        }
    }, [user, setLibrary, setPlaylists, setQueue]);
}

import {confirmModal} from "@/components/ui/confirm-modal/ConfirmModal.jsx";
import {removeTrackFromQueue} from "@/api/queue.js";
import {useRecoilState} from "recoil";
import {
    selectedPlaylistAtom,
    selectedTrackAtom,
    loadingAtom,
    selectedTrackPlaylistsAtom,
    playlistsAtom, currentTrackAtom
} from "@/atoms.js";
import {useRefreshData} from "@/hooks/useRefreshData.jsx";
import {addTrackToPlaylist, fetchPlaylists, removeTrackFromPlaylist} from "@/api/playlists.js";

const useTrack = () => {
    const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackAtom);
    const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);
    const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
    const [selectedTrackPlaylists, setSelectedTrackPlaylists] = useRecoilState(selectedTrackPlaylistsAtom);
    const [playlists, setPlaylists] = useRecoilState(playlistsAtom);
    const { refreshQueue, refreshPlaylists } = useRefreshData();

    const deleteTrackFromQueue = async () => {
        let confirm = await confirmModal('Удалить трек из очереди?');
        if (confirm) {
            if (selectedTrack) {
                setIsLoading(true);
                if (await removeTrackFromQueue(selectedTrack?.queue_id)) await refreshQueue();

                setSelectedTrack(null);
                setSelectedPlaylist(null);
                setIsLoading(false);
            }
        }
    }

    const deleteTrackFromPlaylist = async () => {
        let confirm = await confirmModal('Удалить трек из плейлиста?');
        if (confirm) {
            if (selectedPlaylist && selectedTrack) {
                setIsLoading(true);
                if (await removeTrackFromPlaylist(selectedPlaylist?.id, selectedTrack?.id)) {
                    await refreshPlaylists();
                }
                setSelectedTrack(null);
                setSelectedPlaylist(null);
                setIsLoading(false);
            }
        }
    }

    const addTrackToPlaylistHandler = async (playlistId) => {
        setIsLoading(true);
        if (selectedTrackPlaylists && selectedTrack && playlistId) {
            const isAdded = await addTrackToPlaylist(playlistId, selectedTrack?.id);
            if (isAdded) {
                const refreshedPlaylists = await fetchPlaylists()
                if(refreshedPlaylists) setPlaylists(refreshedPlaylists);
            }
        }
        setSelectedTrackPlaylists(null);
        setSelectedTrack(null);
        setIsLoading(false);
    }

    return {
        deleteTrackFromQueue,
        deleteTrackFromPlaylist,
        addTrackToPlaylistHandler
    };
};

export default useTrack;
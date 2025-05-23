import {deletePlaylist, renamePlaylist} from "@/api/playlists.js";
import {useRecoilState} from "recoil";
import {
    loadingAtom,
    playlistsAtom,
    selectedPlaylistAtom,
    selectedTrackPlaylistsAtom
} from "@/atoms.js";
import {useRefreshData} from "@/hooks/useRefreshData.jsx";
import {filterSelfPlaylists} from "@/utils/playlists.js";
import {emitter} from "@/emitter.js";
import {confirmModal} from "@/components/ui/confirm-modal/ConfirmModal.jsx";

const usePlaylist = () => {
    const [isLoading, setIsLoading] = useRecoilState(loadingAtom);
    const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);
    const [playlists, setPlaylists] = useRecoilState(playlistsAtom);
    const [selectedTrackPlaylists, setSelectedTrackPlaylists] = useRecoilState(selectedTrackPlaylistsAtom);
    const { refreshQueue, refreshPlaylists, refreshLibrary } = useRefreshData();

    const deleteCurrentPlaylist = async () => {
        let confirm = await confirmModal('Удалить плейлист?');
        if (confirm) {
            setIsLoading(true);
            if (await deletePlaylist(selectedPlaylist.id)) {
                setSelectedPlaylist(null);
            }
            await refreshPlaylists();
            setIsLoading(false);
        }
    }

    const renameCurrentPlaylist = async (value) => {
        setIsLoading(true);
        if (await renamePlaylist(selectedPlaylist?.id, value)) {
            setSelectedPlaylist(null);
        }
        await refreshPlaylists();
        setIsLoading(false);
    }

    const addTrackToPlaylistsOpenModal = async () => {
        const selfPlaylists = filterSelfPlaylists(playlists);
        if (selfPlaylists?.length > 0) {
            setIsLoading(true);
            setSelectedTrackPlaylists(selfPlaylists);
            setIsLoading(false);
        } else {
            emitter.emit('notify', {
                message: `У вас нет плейлистов. Перейдите в плейлисты и создайте плейлист.`,
                type: 'warning',
            });
        }
    }

    return {
        deleteCurrentPlaylist,
        renameCurrentPlaylist,
        addTrackToPlaylistsOpenModal
    };
};

export default usePlaylist;
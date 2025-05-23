import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {selectedTrackPlaylistsAtom} from "@/atoms.js";
import styles from "./TrackPlaylistsModal.module.css";
import LoadingScreen from "@/components/loading/LoadingScreen.jsx";
import ModalHeader from "@/components/ui/modal/ModalHeader.jsx";
import useTrack from "@/hooks/useTrack.jsx";

const TrackPlaylistsModal = () => {
    const [selectedTrackPlaylists, setSelectedTrackPlaylists] = useRecoilState(selectedTrackPlaylistsAtom);
    const [isAddingTrackToPlaylist, setIsAddingTrackToPlaylist] = useState(false);
    const { addTrackToPlaylistHandler } = useTrack();

    const ocCloseHandler = () => {
        setSelectedTrackPlaylists(null);
    }

    const addTrackToPlaylistsOpenModalHandler = async ({playlistId}) => {
       await addTrackToPlaylistHandler(playlistId);
    }

    return (
        <div className={styles.container} style={{
            right : selectedTrackPlaylists ? '0' : '-100vw',
        }}>
            <LoadingScreen isShow={isAddingTrackToPlaylist} />

            <ModalHeader onClose={ocCloseHandler} title={'Ваши плейлисты'}/>

            <div className={styles.bodyContainer}>
                {selectedTrackPlaylists && selectedTrackPlaylists.map( (playlist) =>
                    <div className={styles.playlistContainer}
                         onClick={ async () => {
                             await addTrackToPlaylistsOpenModalHandler({playlistId: playlist.id})
                         }} key={playlist.id}>
                        <div>{playlist.title}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackPlaylistsModal;

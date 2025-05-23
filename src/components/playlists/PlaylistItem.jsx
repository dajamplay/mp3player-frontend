import React from 'react';
import styles from './PlaylistItem.module.css';
import {useRecoilState} from "recoil";
import {activePlaylistAtom, selectedPlaylistAtom} from "@/atoms.js";

const PlaylistItem = ({playlist}) => {
    const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);

    const selectPlaylistHandler = (playlist) => {
        setSelectedPlaylist(playlist);
    }

    return (
        <div className={styles.container} onClick={() => selectPlaylistHandler(playlist)}>

            <div className={styles.playlistContainer}>

                <div className={styles.title}>{playlist?.title} ({playlist?.tracks?.length})</div>

                <div className={styles.tracks}>
                    {playlist?.tracks?.slice(-3)?.map((track, index) =>
                        <div key={track.id} className={styles.track}>
                            <div className={styles.image} style={{
                                backgroundImage: track.image ? `url(${track.image})` : 'none',
                            }}></div>
                            <div className={styles.info}>
                                <div className={styles.name}>{track.name}</div>
                                <div className={styles.artist}>{track.artist}</div>
                            </div>
                        </div>
                    )}
                    <div className={styles.advanced}>Посмотреть все...</div>
                </div>

            </div>
        </div>
    );
};

export default PlaylistItem;

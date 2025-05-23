import React from 'react';
import styles from './TrackModal.module.css';
import {useRecoilState} from "recoil";
import {
    currentTrackAtom,
    playerIsPlayingAtom, selectedPlaylistAtom,
    selectedTrackAtom,
} from "@/atoms.js";
import Button from "@/components/ui/buttons/Button.jsx";
import {emitter} from "@/emitter.js";
import TrackPlaylistsModal from "@/components/track/modal/TrackPlaylistsModal.jsx";
import SvgQueue from "@/assets/svg/SvgQueue.jsx";
import SvgLibrary from "@/assets/svg/SvgLibrary.jsx";
import SvgPrev from "@/assets/svg/SvgPrev.jsx";
import SvgNext from "@/assets/svg/SvgNext.jsx";
import SvgPause from "@/assets/svg/SvgPause.jsx";
import SvgPlay from "@/assets/svg/SvgPlay.jsx";
import ModalHeader from "@/components/ui/modal/ModalHeader.jsx";
import useTrack from "@/hooks/useTrack.jsx";
import usePlaylist from "@/hooks/usePlaylist.jsx";

const TrackModal = () => {
    const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackAtom);
    const [isPlaying, setIsPlaying] = useRecoilState(playerIsPlayingAtom);
    const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackAtom);
    const { deleteTrackFromQueue, deleteTrackFromPlaylist } = useTrack();
    const { addTrackToPlaylistsOpenModal } = usePlaylist();
    const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);

    const closeTrackHandler = () => {
        setSelectedTrack(null);
    }

    const playTrackHandler = () => {
        emitter.emit('playTrack', {track: selectedTrack});
    }

    const addTrackToQueueAndPlay = () => {
        emitter.emit('addTrackToQueueAndPlay', {track: selectedTrack});
    }

    const addTrackToQueue = () => {
        emitter.emit('addTrackToQueue', {track: selectedTrack});
    }

    const addToPlaylistHandler = async () => {
        await addTrackToPlaylistsOpenModal();
    }

    const removeTrackFromPlaylistHandler = async () => {
        await deleteTrackFromPlaylist();
    }

    const removeTrackFromQueueHandler = async () => {
        await deleteTrackFromQueue();
    }

    const prevTrackHandler = () => {
        emitter.emit('prevTrack');
    }

    const nextTrackHandler = () => {
        emitter.emit('nextTrack');
    }

    const canDeleteFromPlaylist = () => {
        let isCan = false;

        if (selectedTrack?.type === 'playlist' && selectedPlaylist?.isSelfPlaylist) {
            isCan = true;
        }

        return isCan;
    }

    const getModalTitle = () => {
        switch (selectedTrack?.type) {
            case 'queue':
                return(
                    <>
                        <span>Очередь</span><SvgQueue />
                    </>
                );

            case 'library':
                return(
                    <>
                        <span>Библиотека</span><SvgLibrary />
                    </>
                );

            case 'playlist':
                return(
                    <>
                        <span>Плейлист</span><SvgLibrary />
                    </>
                );

            default:
                return 'Неизвестно';
        }
    }

    return (
        <div className={styles.container} style={{
            'right' : selectedTrack ? '0' : '-100vw',
        }}>
            <TrackPlaylistsModal />

            <div className={styles.containerBackground} style={{
                'backgroundImage' : selectedTrack?.image ? `url(${selectedTrack?.image})` : 'none',
            }}></div>

            <ModalHeader onClose={closeTrackHandler} title={getModalTitle()}/>

            <div className={styles.bodyContainer}>
                <div className={styles.infoContainer}>

                    <div className={styles.title}>
                        <h2 className={styles.titleName}>{selectedTrack?.name}</h2>
                    </div>

                    <div className={styles.title}>
                        <h2 className={styles.titleArtist}>{selectedTrack?.artist}</h2>
                    </div>

                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.leftRight} onClick={prevTrackHandler}>
                        <SvgPrev />
                    </div>
                    {selectedTrack?.type === 'queue' &&<div onClick={playTrackHandler}>
                        {isPlaying && currentTrack?.queue_id === selectedTrack?.queue_id ?
                            <SvgPause />
                            :
                            <SvgPlay />
                        }
                    </div>}
                    {selectedTrack?.type !== 'queue' &&<div onClick={playTrackHandler}>
                        {isPlaying && currentTrack?.id === selectedTrack?.id ?
                            <SvgPause />
                            :
                            <SvgPlay />
                        }
                    </div>}
                    <div className={styles.leftRight} onClick={nextTrackHandler}>
                        <SvgNext />
                    </div>
                </div>

                {selectedTrack?.type !== 'queue' && <div className={styles.buttonContainer}>
                    <Button type={'primary'} onClick={addTrackToQueueAndPlay}>
                        Добавить в очередь и воспроизвести
                    </Button>
                </div>}

                {selectedTrack?.type !== 'queue' && <div className={styles.buttonContainer}>
                    <Button type={'primary'} onClick={addTrackToQueue}>
                        Добавить в очередь
                    </Button>
                </div>}

                {selectedTrack?.type !== 'playlist' && <div className={styles.buttonContainer}>
                    <Button type={'warning'} onClick={addToPlaylistHandler}>
                        Добавить в плейлист
                    </Button>
                </div>}

                {(selectedTrack?.type === 'queue' && selectedPlaylist?.isSelfPlaylist) && <div className={styles.buttonContainer}>
                    <Button type={'danger'} onClick={removeTrackFromQueueHandler}>
                        Удалить из очереди
                    </Button>
                </div>}

                {canDeleteFromPlaylist() && <div className={styles.buttonContainer}>
                    <Button type={'danger'} onClick={removeTrackFromPlaylistHandler}>
                        Удалить из плейлиста
                    </Button>
                </div>}

                <div className={styles.infoContainer}>
                    <h2 className={styles.titleAuthor}>Опубликовал: {selectedTrack?.author}</h2>
                </div>
            </div>
        </div>
    );
};

export default TrackModal;

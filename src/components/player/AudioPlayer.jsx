import React, {useEffect, useRef} from 'react';
import styles from '@/components/player/AudioPlayer.module.css';
import {useRecoilState, useRecoilValue} from "recoil";
import {
    activePlaylistAtom,
    currentProgressTrackAtom, currentTimeTrackAtom,
    currentTrackAtom, libraryAtom,
    playerIsPlayingAtom,
    queueAtom,
    selectedTrackAtom
} from "@/atoms.js";
import ProgressBar from "@/components/player/ProgressBar.jsx";
import {emitter} from "@/emitter.js";
import { throttle } from 'lodash';
import {nextTrackByType} from "@/components/player/functions/nextTrack.js";
import {mediaSession} from "@/components/player/functions/mediaSession.js";
import {useNavigate} from "react-router-dom";
import {prevTrackByType} from "@/components/player/functions/prevTrack.js";
import { useAudioPlayerControls } from "@/hooks/useAudioPlayerControls";
import {playTrack} from "@/components/player/functions/playTrack.js";
import {addTrackToQueue} from "@/components/player/functions/addTrackToQueue.js";
import {addPlaylistToQueue} from "@/components/player/functions/addPlaylistToQueue.js";
import {updateQueue} from "@/api/queue.js";
import {useRefreshData} from "@/hooks/useRefreshData.jsx";
import SvgPrev from "@/assets/svg/SvgPrev.jsx";
import SvgNext from "@/assets/svg/SvgNext.jsx";

const AudioPlayer = () => {

    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const library = useRecoilValue(libraryAtom);
    const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackAtom);
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [progress, setProgress] = useRecoilState(currentProgressTrackAtom);
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeTrackAtom);
    const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackAtom);
    const [activePlaylist, setActivePlaylist] = useRecoilState(activePlaylistAtom);
    const navigate = useNavigate();
    const { isPlaying, playerPlay, playerPause, playerStop, togglePlay, clearPlayer } = useAudioPlayerControls(audioRef);
    const { refreshQueue } = useRefreshData();

    emitter.off('addQueue');
    emitter.on('addQueue', async ({tracks}) => {
        let newQueue = addPlaylistToQueue(tracks, queue);
        if (newQueue) {
            await updateQueue(newQueue);
            await refreshQueue();
            emitter.emit('notify', { message: `Треки добавлены в очередь` });
        } else {
            emitter.emit('notify', { message: `Слишком много треков в очереди` });
        }
    });

    emitter.off('addTrackToQueue');
    emitter.on('addTrackToQueue', async ({track}) => {
        let newQueue = addTrackToQueue(
            queue,
            track,
            togglePlay,
            setQueue,
            playerStop,
            setCurrentTrack,
            selectedTrack,
            setSelectedTrack,
            false);
        if (newQueue) {
            await updateQueue(newQueue);
            emitter.emit('notify', { message: `Трек добавлен в очередь` });
        } else {
            emitter.emit('notify', { message: `Слишком много треков в очереди` });
        }
    });

    emitter.off('addTrackToQueueAndPlay');
    emitter.on('addTrackToQueueAndPlay', async ({track}) => {
        let newQueue = addTrackToQueue(
            queue,
            track,
            togglePlay,
            setQueue,
            playerStop,
            setCurrentTrack,
            selectedTrack,
            setSelectedTrack,
            true);
        if (newQueue) {
            await updateQueue(newQueue);
            emitter.emit('notify', { message: `Трек добавлен в очередь` });
            navigate('/');
        } else {
            emitter.emit('notify', { message: `Слишком много треков в очереди` });
        }
    });

    emitter.off('playTrack');
    emitter.on('playTrack', ({track}) => {
        playTrack(
            currentTrack,
            playerStop,
            togglePlay,
            setCurrentTrack,
            track,
            setActivePlaylist
        );
    });

    emitter.off('nextTrack');
    emitter.on('nextTrack', () => {
        next();
    });

    emitter.off('prevTrack');
    emitter.on('prevTrack', () => {
        prev();
    });

    emitter.off('clearPlayer');
    emitter.on('clearPlayer', () => {
        clearPlayer();
    });

    const next = (e) => {
        e?.stopPropagation();
        nextTrackByType(
            currentTrack,
            playerStop,
            setCurrentTrack,
            queue,
            selectedTrack,
            setSelectedTrack,
            library,
            audioRef,
            activePlaylist
        );
    }

    const prev = (e) => {
        e?.stopPropagation();
        prevTrackByType(
            currentTrack,
            playerStop,
            setCurrentTrack,
            queue,
            selectedTrack,
            setSelectedTrack,
            library,
            audioRef,
            activePlaylist
        );
    }

    const openModalMenuTrackHandler = () => {
        if(!currentTrack.id) return;

        if (selectedTrack) {
            setSelectedTrack(null);
        } else {
            setSelectedTrack(currentTrack);
        }
    }

    const updateProgress = throttle(() => {
        if (!audioRef.current || !audioRef.current.duration) return;
        const current = audioRef.current.currentTime;
        setCurrentTime(current);
        const duration = audioRef.current.duration;
        const newProgress = (current / duration) * 100;
        setProgress(newProgress);
    }, 1000);

    const handleSeek = (e) => {
        if (Object.keys(currentTrack).length <= 0) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (offsetX / width) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    const handleCanPlay = () => {
        playerPlay();
    }

    const handleTrackEnd = () => {
        next();
    }

    const getTypeRussian = () => {
        switch (currentTrack?.type) {
            case "library":
                return "Из библиотеки";
            case "queue":
                return "Из очереди";
            case "playlist":
                return "Из плейлиста";
            default:
                return "Пусто";
        }
    }

    useEffect(() => {
        mediaSession(
            currentTrack,
            playerPlay,
            playerPause,
            prev,
            next);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.containerBackground} style={{
                'backgroundImage' : currentTrack?.image ? `url(${currentTrack.image})` : 'none',
            }}></div>
            <audio
                ref={audioRef}
                src={currentTrack?.url}
                preload="metadata"
                onEnded={handleTrackEnd}
                onTimeUpdate={updateProgress}
                onCanPlay={handleCanPlay}
            />
            <ProgressBar
                progress={progress}
                progressBarRef={progressBarRef}
                handleSeek={handleSeek}
                currentTime={currentTime}
                duration={audioRef?.current?.duration}
            />
            <div className={styles.infoContainer} onClick={openModalMenuTrackHandler}>
                <div className={styles.imageContainer}>
                    {currentTrack.image && <div className={styles.image} style={{
                        'backgroundImage' : currentTrack.image ? `url(${currentTrack.image})` : 'none',
                    }}></div>}
                    {isPlaying && <img src='/images/audio-eq.gif' className={styles.imageGif}/>}
                </div>
                <div className={styles.titleContainer}>
                    <div className={styles.titleName}>{currentTrack?.name}</div>
                    <div className={styles.titleArtist}>{currentTrack?.artist}</div>
                </div>
                <div className={styles.controlContainerPrevNext} onClick={ (e) => {prev(e)}}>
                    <SvgPrev />
                </div>
                <div className={styles.controlContainer} onClick={ (e) => {togglePlay(e)}}>
                    {isPlaying ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="#eeeeee">
                            <rect x="15" y="10" width="8" height="30" />
                            <rect x="27" y="10" width="8" height="30" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="#eeeeee">
                            <polygon points="15,10 40,25 15,40" />
                        </svg>
                    }
                </div>
                <div className={styles.controlContainerPrevNext} onClick={ (e) => {next(e)}}>
                    <SvgNext />
                </div>
            </div>

            <div className={styles.volumeSliderContainer}>
                <div className={styles.type}>{getTypeRussian()}</div>
                <input
                    type="range"
                    className={styles.volumeSlider}
                    min="0"x
                    max="1"
                    step="0.01"
                    onChange={(e) => audioRef.current.volume = e.target.value}
                />
            </div>

        </div>
    );
};

export default AudioPlayer;

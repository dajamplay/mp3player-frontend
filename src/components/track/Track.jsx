import React from 'react';
import {useRecoilState} from "recoil";
import {
    currentProgressTrackAtom,
    currentTimeTrackAtom,
    currentTrackAtom,
    playerIsPlayingAtom,
    selectedTrackAtom
} from "@/atoms.js";
import styles from './Track.module.css';
import {formatTime} from "@/utils/time.js";
import {emitter} from "@/emitter.js";
import SvgPause from "@/assets/svg/SvgPause.jsx";
import SvgPlay from "@/assets/svg/SvgPlay.jsx";

const Track = ({track, isQueue}) => {

    const [isPlaying, setIsPlaying] = useRecoilState(playerIsPlayingAtom);
    const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackAtom)
    const [progress, setProgress] = useRecoilState(currentProgressTrackAtom);
    const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackAtom);
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeTrackAtom);

    const clickOnTrackHandler = () => {
        setSelectedTrack(track);
    }

    const clickOnPlayPauseButtonHandler = (e) => {
        e.stopPropagation();
        emitter.emit('playTrack', {track: track});
    }

    const isActive = (playing = true) => {
        if (!playing) {
            if (!isQueue) return isPlaying && currentTrack.id === track.id;
            return isPlaying && currentTrack.queue_id === track.queue_id;
        } else {
            if (!isQueue) return currentTrack.id === track.id;
            return currentTrack.queue_id === track.queue_id;
        }
    }


    return (
        <div onClick={clickOnTrackHandler} className={styles.container} style={{
            'border': isActive() ? '1px solid tomato' : '1px solid #111',
        }}>
            <div className={styles.containerBackground} style={{
                'backgroundImage' : track.image ? `url(${track.image})` : 'none',
                'opacity' : isActive()? '0.1' : '0.05',
            }}></div>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    {track.image && <div className={styles.image} style={{
                        'backgroundImage' : track.image ? `url(${track.image})` : 'none',
                    }}></div>}
                    {isActive(false) && <img src='/images/audio-eq.gif' className={styles.imageGif}/>}
                    <div className={styles.controlContainer} onClick={clickOnPlayPauseButtonHandler}>
                        {track?.type === 'queue' && <div>
                            {isPlaying && currentTrack?.queue_id === track?.queue_id ?
                                <SvgPause />
                                :
                                <SvgPlay />
                            }
                        </div>}
                        {track?.type !== 'queue' &&<div>
                            {isPlaying && currentTrack?.id === track?.id ?
                                <SvgPause />
                                :
                                <SvgPlay />
                            }
                        </div>}
                    </div>
                </div>
                <div className={styles.titleContainer}>
                    <div className={styles.titleName}>{track.name}</div>
                    <div className={styles.titleArtist}>{track.artist}</div>
                </div>
                <div className={styles.durationContainer}>
                    {isActive() &&
                        <div className={styles.duration}>
                            {formatTime(currentTime)}
                        </div>
                    }
                    {isActive() &&
                        <div className={styles.durationSeparator}>-</div>
                    }
                    <div className={styles.duration}>
                        {formatTime(track.duration)}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Track;

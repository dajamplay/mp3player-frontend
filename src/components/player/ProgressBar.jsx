import React from 'react';
import styles from "@/components/player/AudioPlayer.module.css";
import {formatTime} from "@/utils/time.js";

const ProgressBar = ({progress, progressBarRef, handleSeek, currentTime, duration}) => {
    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.time}>{formatTime(currentTime)}</div>
            <div
                ref={progressBarRef}
                onClick={handleSeek}
                className={styles.progressBarWrap}
            >
                <div
                    className={styles.progressBarInner}
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
            <div className={styles.time}>{formatTime(duration) ?? '0:00'}</div>
        </div>
    );
};

export default ProgressBar;
import React from 'react';
import Track from "@/components/track/Track.jsx";
import {useRecoilValue} from "recoil";
import {queueAtom} from "@/atoms.js";
import styles from './Queue.module.css';
import Button from "@/components/ui/buttons/Button.jsx";
import useQueue from "@/hooks/useQueue.jsx";

const Queue = () => {

    const queue = useRecoilValue(queueAtom);
    const { clearQueue } = useQueue();

    const clearQueueHandler = async () => {
        await clearQueue();
    }

    return (
        <div>
            <div className={styles.trackContainer}>
                {queue.map(track =>
                    <Track key={track.queue_id} track={track} isQueue={true}/>
                )}
            </div>

            <div className={styles.clearButtonContainer}>
                <Button onClick={clearQueueHandler} type={'warning'}>Очистить очередь</Button>
            </div>
        </div>
    );
};

export default Queue;
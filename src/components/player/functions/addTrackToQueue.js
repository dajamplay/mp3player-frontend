import {prepareTrackToAddQueue} from "@/utils/track.js";

export const addTrackToQueue = (
    queue,
    track,
    togglePlay,
    setQueue,
    playerStop,
    setCurrentTrack,
    selectedTrack,
    setSelectedTrack,
    playAfterAddToQueue
) => {

    if (queue?.length >= 100) {
        return false;
    }

    let tempTrack = prepareTrackToAddQueue(track);
    let tempQueue = [...queue, tempTrack];

    setQueue(tempQueue);

    if (playAfterAddToQueue) {
        playerStop();
        setCurrentTrack(tempTrack);
        if (selectedTrack) setSelectedTrack(tempTrack);
    }

    return tempQueue;

}
import {prepareTrackToAddQueue} from "@/utils/track.js";

export const addPlaylistToQueue = (tracks, queue) => {

    if (queue?.length >= 100) {
        return false;
    }

    if (tracks) {
        let tempQueue = queue ?? [];
        tracks.map( track => {
            tempQueue.push(prepareTrackToAddQueue(track));
        });
        return tempQueue;
    } else {
        return false;
    }
}
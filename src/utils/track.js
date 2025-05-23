import { v4 as uuidv4 } from 'uuid';

export const prepareTrackToAddQueue = (track) => {
    return {
        ...track,
        queue_id: uuidv4(),
        type: 'queue',
        url: track.url + '?uid=' + uuidv4()
    };
}

export const prepareTrackForPlayPlaylist = (track, playlist) => {
    return {
        ...track,
        playlist: playlist
    };
}

export const findIndexTrackByQueueId = (id, queue) => {
    return queue.findIndex(track => track.queue_id === id);
}

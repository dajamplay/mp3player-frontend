import {findIndexTrackByQueueId, prepareTrackForPlayPlaylist} from "@/utils/track.js";

export const nextTrackByType = (
    currentTrack,
    playerStop,
    setCurrentTrack,
    queue,
    selectedTrack,
    setSelectedTrack,
    library,
    audioRef,
    activePlaylist
) => {

    let tempTrack = selectedTrack ?? currentTrack ?? null;
    switch (tempTrack?.type) {
        case 'library':
            let indexCurrentTrackLibrary = library.findIndex(track => track.id === tempTrack.id);

            if (indexCurrentTrackLibrary < library.length - 1) {
                playerStop();
                setCurrentTrack(library[indexCurrentTrackLibrary + 1])
                if (selectedTrack) setSelectedTrack(library[indexCurrentTrackLibrary + 1]);
            } else {
                playerStop();
                setCurrentTrack(library[0])
                if (selectedTrack) setSelectedTrack(library[0]);
            }
            break;

        case 'queue':
            if (queue.length <= 0) {
                playerStop();
                return;
            }

            if (queue.length === 1) {
                audioRef.current.currentTime = '0';
                return;
            }

            let indexCurrentTrackQueue = findIndexTrackByQueueId(tempTrack.queue_id, queue);

            if (indexCurrentTrackQueue < queue.length - 1) {
                let nextTrack = queue[indexCurrentTrackQueue + 1];
                playerStop();
                setCurrentTrack(nextTrack)
                if (selectedTrack) {
                    setSelectedTrack(nextTrack);
                }
            } else {
                playerStop();
                setCurrentTrack(queue[0])
                if (selectedTrack) setSelectedTrack(queue[0]);
            }
            break;

        case 'playlist':
            if (!activePlaylist) return;

            if (activePlaylist.length === 1) {
                audioRef.current.currentTime = '0';
                return;
            }

            let nextTrack;
            let indexCurrentTrackPlaylist = activePlaylist.findIndex(track => track.id === currentTrack?.id);

            if (indexCurrentTrackPlaylist < activePlaylist.length - 1) {
                nextTrack = activePlaylist[indexCurrentTrackPlaylist + 1];
            } else {
                nextTrack = activePlaylist[0];
            }

            playerStop();
            setCurrentTrack(nextTrack)
            if (selectedTrack) setSelectedTrack(nextTrack);

            break;

        default:
            console.log('switch - default - next')
            playerStop();
            break;
    }
}

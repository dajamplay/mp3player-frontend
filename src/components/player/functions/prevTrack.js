import {findIndexTrackByQueueId, prepareTrackForPlayPlaylist} from "@/utils/track.js";

export const prevTrackByType = (
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
            console.log('switch - library - prev')
            if (library.length <= 0) {
                playerStop();
                return;
            }

            let indexCurrentTrackLibrary = library.findIndex(track => track.id === tempTrack.id);

            if (indexCurrentTrackLibrary > 0) {
                playerStop();
                setCurrentTrack(library[indexCurrentTrackLibrary - 1])
                if (selectedTrack) setSelectedTrack(library[indexCurrentTrackLibrary - 1]);
            } else {
                playerStop();
                setCurrentTrack(library[library.length - 1])
                if (selectedTrack) setSelectedTrack(library[library.length - 1]);
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

            if (indexCurrentTrackQueue > 0) {
                playerStop();
                setCurrentTrack(queue[indexCurrentTrackQueue - 1])
                if (selectedTrack) setSelectedTrack(queue[indexCurrentTrackQueue - 1]);
            } else {
                playerStop();
                setCurrentTrack(queue[queue.length - 1])
                if (selectedTrack) setSelectedTrack(queue[queue.length - 1]);
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

            if (indexCurrentTrackPlaylist > 0) {
                nextTrack = activePlaylist[indexCurrentTrackPlaylist - 1];
            } else {
                nextTrack = activePlaylist[activePlaylist.length - 1];
            }

            playerStop();
            setCurrentTrack(nextTrack)
            if (selectedTrack) setSelectedTrack(nextTrack);

            break;

        default:
            console.log('switch - default - prev')
            playerStop();
            break;
    }
}

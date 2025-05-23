export const playTrack = (currentTrack, playerStop, togglePlay, setCurrentTrack, track, setActivePlaylist) => {

    switch (track.type) {
        case 'queue':
            if (track.queue_id === currentTrack.queue_id) {
                togglePlay();
            } else {
                playerStop();
                setCurrentTrack(track);
            }
            break;

        case 'library':
            if (track.id === currentTrack.id) {
                togglePlay();
            } else {
                playerStop();
                setCurrentTrack(track);
            }
            break;

        case 'playlist':
            if (track.id === currentTrack.id) {
                togglePlay();
            } else {
                playerStop();
                setCurrentTrack(track);
                setActivePlaylist(track?.playlist);
            }
            break;

        default:
            console.log('Play toggle default.');

    }
}
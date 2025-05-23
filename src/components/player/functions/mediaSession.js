export const mediaSession = (
    currentTrack,
    playerPlay,
    playerPause,
    prev,
    next
) => {
    if ('mediaSession' in navigator) {
        //TODO Отображение починить
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentTrack?.title ?? 'Неизвестный исполнитель',
            artist: currentTrack?.title ?? 'Неизвестный исполнитель',
            album: currentTrack?.title ?? 'Неизвестный исполнитель',
            // artwork: [
            //     { src: (currentTrack.image ?? 'https://example.com/artwork.jpg') , sizes: '512x512', type: 'image/jpeg' }
            // ]
        });

        navigator.mediaSession.setActionHandler('play', () => {
            playerPlay();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
            playerPause();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            prev();
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            next();
        });
    }
}

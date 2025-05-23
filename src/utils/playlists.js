export const filterSelfPlaylists = (playlists) => {
    if (playlists) {
        return playlists.filter(playlist => playlist?.isSelfPlaylist);
    }
}

export const filterWithoutSelfPlaylists = (playlists) => {
    if (playlists) {
        return playlists.filter(playlist => !playlist?.isSelfPlaylist);
    }
}
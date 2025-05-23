import { atom } from 'recoil';

export const queueAtom = atom({
    key: 'queueAtom',
    default: [],
});


export const libraryAtom = atom({
    key: 'tracksAtom',
    default: [],
});

export const playlistsAtom = atom({
    key: 'playlistsAtom',
    default: [],
});

export const activePlaylistAtom = atom({
    key: 'activePlaylistAtom',
    default: null,
});

export const menuIsOpenAtom = atom({
    key: 'menuIsOpenAtom',
    default: false,
});

export const loadingAtom = atom({
    key: 'loadingAtom',
    default: false,
});

export const currentTrackAtom = atom({
    key: 'currentTrackAtom',
    default: {},
});

export const playerIsPlayingAtom = atom({
    key: 'playerIsPlayingAtom',
    default: false,
});

export const selectedPlaylistAtom = atom({
    key: 'selectedPlaylistAtom',
    default: null,
});

export const selectedTrackAtom = atom({
    key: 'selectedTrackAtom',
    default: null,
});

export const currentTimeTrackAtom = atom({
    key: 'currentTimeTrackAtom',
    default: 0,
});

export const selectedTrackPlaylistsAtom = atom({
    key: 'selectedTrackPlaylistsAtom',
    default: null,
});

export const currentProgressTrackAtom = atom({
    key: 'currentProgressTrackAtom',
    default: 0,
});

export const userAtom = atom({
    key: 'userAtom',
    default: null,
});

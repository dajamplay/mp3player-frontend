import { useRecoilState } from "recoil";
import {currentTrackAtom, playerIsPlayingAtom} from "@/atoms.js";

export const useAudioPlayerControls = (audioRef) => {
    const [isPlaying, setIsPlaying] = useRecoilState(playerIsPlayingAtom);
    const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackAtom);

    const playerPlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const playerPause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const playerStop = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const togglePlay = (e) => {
        if (e) e.stopPropagation();
        if (isPlaying) {
            playerPause();
        } else {
            if (Object.keys(currentTrack).length > 0) {
                playerPlay();
            }
        }
    };

    const clearPlayer = () => {
        setCurrentTrack({});
        playerStop();
        audioRef.current.src = '';
    }

    return { isPlaying, setIsPlaying, playerPlay, playerPause, playerStop, togglePlay, clearPlayer };
};

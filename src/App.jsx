import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "@/AppRoutes";
import Header from "@/components/header/Header";
import AudioPlayer from "@/components/player/AudioPlayer.jsx";
import Notifications from "@/components/notification/Notifications.jsx";
import {useRecoilState} from "recoil";
import {libraryAtom, loadingAtom, playlistsAtom, queueAtom, userAtom} from "@/atoms.js";
import LoginPage from "@/pages/LoginPage.jsx";
import TrackModal from "@/components/track/modal/TrackModal.jsx";
import {useFetchData} from "@/hooks/useFetchData.jsx";
import {fetchQueue} from "@/api/queue.js";
import LoadingScreen from "@/components/loading/LoadingScreen.jsx";

function App() {

    const [user, setUser] = useRecoilState(userAtom);
    const [library, setLibrary] = useRecoilState(libraryAtom);
    const [playlists, setPlaylists] = useRecoilState(playlistsAtom);
    const [queue, setQueue] = useRecoilState(queueAtom);
    const [isLoadingScreen, setIsLoadingScreen] = useRecoilState(loadingAtom);
    const [isLoadingData, setIsLoading] = useState(true);

    useEffect( () => {
        // console.log = () => {};
        // console.warn = () => {};
        // console.error = () => {};

        fetchQueue();

        const setRealViewportHeight = () => {
            const viewportHeight = window.innerHeight;
            document.documentElement.style.setProperty("--real-vh", `${viewportHeight / 100}px`);
        };

        setRealViewportHeight();
        window.addEventListener("resize", setRealViewportHeight);

        return () => {
            window.removeEventListener("resize", setRealViewportHeight);
        };
    }, []);

    useEffect( () => {
        if (library && playlists && queue) setIsLoading(false);
    }, [library, playlists, queue]);

    useFetchData(setLibrary, setPlaylists, setQueue, user);

    return (
        <>
            <LoadingScreen isShow={isLoadingScreen}/>
            { user && !isLoadingData ?
                <BrowserRouter>
                    <TrackModal />
                    <Notifications />
                    <Header />
                    <AppRoutes />
                    <AudioPlayer />
                </BrowserRouter> : <LoginPage />}
        </>
    )
}

export default App;

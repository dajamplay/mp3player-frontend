import React, {useState} from 'react';
import {useRecoilState} from "recoil";
import {playlistsAtom} from "@/atoms.js";
import PlaylistItem from "@/components/playlists/PlaylistItem.jsx";
import styles from './Playlists.module.css';
import {createPlaylist, fetchPlaylists} from "@/api/playlists.js";
import PlaylistModal from "@/components/playlists/modal/PlaylistModal.jsx";
import LoadingScreen from "@/components/loading/LoadingScreen.jsx";
import Loading from "@/components/loading/Loading.jsx";
import InputDialog from "@/components/ui/dialog-window/InputDialog.jsx";
import {emitter} from "@/emitter.js";

const Playlists = () => {

    const [playlists, setPlaylists] = useRecoilState(playlistsAtom);
    const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
    const [isDialogCreatePlaylistOpen, setIsDialogCreatePlaylistOpen] = useState(false);

    const createPlaylistHandle = async (value) => {
        if (value) {
            setIsCreatingPlaylist(true);
            await createPlaylist(value);
            await refreshPlaylists();
        } else {
            emitter.emit('notify', {
                message: 'Нужно ввести название плейлиста',
                type: 'warning'
            });
        }
        setIsCreatingPlaylist(false);
    };

    const refreshPlaylists = async () => {
        const refreshedPlaylists = await fetchPlaylists()
        if(refreshedPlaylists) setPlaylists(refreshedPlaylists);
    }

    if (!playlists || playlists.length === 0) {
        return (<div><Loading /></div>);
    }

    return (
        <div>
            <InputDialog
                title={'Введите название плейлиста'}
                handleSubmit={createPlaylistHandle}
                isOpen={isDialogCreatePlaylistOpen}
                setIsOpen={setIsDialogCreatePlaylistOpen}
            />
            <PlaylistModal />

            <LoadingScreen isShow={isCreatingPlaylist} title={'Создание плейлиста'}/>

            <h1>Мои плейлисты</h1>

            <div className={styles.playlistsContainer}>
                {playlists
                    .filter(playlist => playlist?.isSelfPlaylist)
                    .map(playlist =>
                        <PlaylistItem
                            key={playlist.id}
                            playlist={playlist}
                        />
                    )}
            </div>

            <div className={styles.buttonCreatePlaylistContainer}>
                <div className={styles.buttonCreatePlaylist} onClick={ () => setIsDialogCreatePlaylistOpen(true)}>
                    Создать новый плейлист
                </div>
            </div>


            <h1>Все плейлисты</h1>

            <div className={styles.playlistsContainer}>
                {playlists
                    .filter(playlist => !playlist?.isSelfPlaylist)
                    .map(playlist =>
                        <PlaylistItem key={playlist.id} playlist={playlist}/>
                    )}
            </div>
        </div>
    );
};

export default Playlists;

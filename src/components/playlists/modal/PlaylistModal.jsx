import React, {useState} from 'react';
import styles from './PlaylistModal.module.css';
import {useRecoilState} from "recoil";
import {selectedPlaylistAtom} from "@/atoms.js";
import Track from "@/components/track/Track.jsx";
import Button from "@/components/ui/buttons/Button.jsx";
import {emitter} from "@/emitter.js";
import InputDialog from "@/components/ui/dialog-window/InputDialog.jsx";
import ModalHeader from "@/components/ui/modal/ModalHeader.jsx";
import usePlaylist from "@/hooks/usePlaylist.jsx";

const PlaylistModal = () => {

    const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(selectedPlaylistAtom);
    const [isDialogRenamePlaylistOpen, setIsDialogRenamePlaylistOpen] = useState(false);
    const { deleteCurrentPlaylist, renameCurrentPlaylist } = usePlaylist();

    const closeHandler = () => {
        setSelectedPlaylist(null);
    }

    const playAllHandler = async () => {
        if (selectedPlaylist) {
            emitter.emit('addQueue', { tracks: selectedPlaylist.tracks });
        }
    }

    const deleteCurrentPlaylistHandler = async () => {
        await deleteCurrentPlaylist();
    }

    const renameCurrentPlaylistHandler = async (value) => {
        await renameCurrentPlaylist(value);
    }

    return (
        <div className={styles.container} style={{
            'right' : selectedPlaylist ? '0' : '-100vw',
        }}>
            <InputDialog
                title={'Введите название плейлиста'}
                handleSubmit={renameCurrentPlaylistHandler}
                isOpen={isDialogRenamePlaylistOpen}
                setIsOpen={setIsDialogRenamePlaylistOpen}
                startValue={selectedPlaylist?.title}
            />

            <div>

                <ModalHeader onClose={closeHandler} title={selectedPlaylist?.title}/>

                <div className={styles.modalBody}>

                    {(selectedPlaylist?.tracks.length > 0) && <div className={styles.buttonContainer}>
                        <Button type={'success'} onClick={playAllHandler}>
                            Добавить в очередь
                        </Button>
                    </div>}

                    <div style={{
                        'display' : 'flex',
                        'flexWrap' : 'wrap',
                    }}>
                        {selectedPlaylist && selectedPlaylist?.tracks.map( track =>
                            <Track key={track.id} track={track} isQueue={false} playlist={selectedPlaylist?.tracks}/>
                        )}
                    </div>

                    {selectedPlaylist?.isSelfPlaylist && <div className={styles.buttonContainer}>
                        <Button type={'primary'} onClick={()=>setIsDialogRenamePlaylistOpen(true)}>
                            Переименовать плейлист
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                        </Button>
                    </div>}

                    {selectedPlaylist?.isSelfPlaylist && <div className={styles.buttonContainer}>
                        <Button type={'danger'} onClick={deleteCurrentPlaylistHandler}>
                            Удалить плейлист
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </Button>
                    </div>}

                </div>
            </div>
        </div>
    );
};

export default PlaylistModal;

import React, {useEffect, useState} from 'react';
import DialogWindow from "@/components/ui/dialog-window/DialogWindow.jsx";

const InputDialog = ({handleSubmit, isOpen ,setIsOpen, title = "", startValue = ""}) => {
    const [inputPlaylistNameValue, setInputPlaylistNameValue] = useState("");

    useEffect(() => {
        if (isOpen) {
            setInputPlaylistNameValue(startValue);
        }
    }, [isOpen, startValue]);

    return (
        <DialogWindow
            title={title}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
                handleSubmit(inputPlaylistNameValue);
                setInputPlaylistNameValue("");
                setIsOpen(false);
            }}
        >
            <input
                type="text"
                value={inputPlaylistNameValue}
                onChange={(e) => setInputPlaylistNameValue(e.target.value)}
                placeholder={title}
            />
        </DialogWindow>
    );
};

export default InputDialog;

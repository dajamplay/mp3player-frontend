import React from 'react';
import MainTemplate from "@/templates/MainTemplate.jsx";
import Playlists from "@/components/playlists/Playlists.jsx";

const PlaylistsPage = () => {
    return (
        <MainTemplate>
                <Playlists />
        </MainTemplate>
    );
};

export default PlaylistsPage;

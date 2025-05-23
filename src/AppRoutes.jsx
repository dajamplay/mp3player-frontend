import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QueuePage from "@/pages/QueuePage.jsx";
import NotFoundPage from "@/pages/NotFoundPage.jsx";
import LibraryPage from "@/pages/LibraryPage.jsx";
import PlaylistsPage from "@/pages/PlaylistsPage.jsx";
import SettingsPage from "@/pages/SettingsPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<QueuePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

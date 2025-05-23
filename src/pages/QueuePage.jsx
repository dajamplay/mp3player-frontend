import React from 'react';
import Queue from "@/components/queue/Queue.jsx";
import MainTemplate from "@/templates/MainTemplate.jsx";

const QueuePage = () => {
    return (
        <MainTemplate>
            <h1>Очередь</h1>
            <Queue />
        </MainTemplate>
    );
};

export default QueuePage;

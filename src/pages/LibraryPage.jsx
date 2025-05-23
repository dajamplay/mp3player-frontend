import React from 'react';
import MainTemplate from "@/templates/MainTemplate.jsx";
import Library from "@/components/library/Library.jsx";


const Home = () => {

    return (
        <MainTemplate>
            <h1>Библиотека</h1>
                <Library />
        </MainTemplate>
    );
};

export default Home;

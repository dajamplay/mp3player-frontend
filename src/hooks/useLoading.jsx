import React, {useEffect, useState} from 'react';
import LoadingScreen from "@/components/loading/LoadingScreen.jsx";
import ReactDOM from "react-dom";

const useLoading = (size = 70) => {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const loadingContainer = document.createElement('div');
        document.body.appendChild(loadingContainer);

        const cleanup = () => {
            ReactDOM.unmountComponentAtNode(loadingContainer);
        };

        if (isLoading) {
            ReactDOM.render(
                <LoadingScreen isShow={isLoading} size={size} />,
                loadingContainer
            );
        } else {
            cleanup();
        }

        return () => {
            cleanup();
        };

    }, [isLoading]);

    return {
        setIsLoading,
    };
};

export default useLoading;
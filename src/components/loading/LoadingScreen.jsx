import React from 'react';
import Loading from "@/components/loading/Loading.jsx";

const LoadingScreen = ({isShow, color, size, title = ''}) => {
    return (
        <>
            {isShow && <div style={{
                'backgroundColor': 'rgba(51,51,51,0.85)',
                'position': 'fixed',
                'left': '0',
                'top': '0',
                'right': '0',
                'bottom': '0',
                'display': 'flex',
                'alignItems': 'center',
                'justifyContent': 'center',
                'zIndex': '900',
                'flexDirection': 'column'
            }}>
                <div style={{
                    'fontSize': '18px',
                    'color': 'tomato',
                    'marginBottom': '10px',
                }}>{title}</div>
                <Loading color={color} size={size}/>

            </div>}
        </>
    );
};

export default LoadingScreen;

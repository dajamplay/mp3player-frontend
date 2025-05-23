export const formatTime = (seconds) => {
    if (isNaN(seconds)) return;
    const roundedSeconds = Math.floor(seconds); // Округляем
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};


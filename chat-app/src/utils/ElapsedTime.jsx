import React, { useState, useEffect } from 'react';

const TimeAgoDisplay = ({ time, dateNow }) => {
    const [elapsedTime, setElapsedTime] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const previousDate = new Date(time);
        const timeDifference = currentDate - previousDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (seconds < 60) {
            setElapsedTime(`-1m ago`);
        } else if (minutes < 60) {
            setElapsedTime(`${minutes} minute${minutes !== 1 ? 's' : ''} ago`);
        } else if (hours < 24) {
            setElapsedTime(`${hours} hour${hours !== 1 ? 's' : ''} ago`);
        } else {
            setElapsedTime(`${days} day${days !== 1 ? 's' : ''} ago`);
        }
    }, [time, dateNow]);

    return <>{elapsedTime}</>;
};

export default TimeAgoDisplay;

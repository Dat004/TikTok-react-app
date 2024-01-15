import { useEffect, useState } from 'react';

const usePlayer = (position, ref, index, delay) => {
    const [pos, setPos] = useState(position);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setPos(position);

            if (pos === index) {
                ref.current.play();
            } else {
                ref.current.pause();
            }
        }, delay);

        return () => {
            clearTimeout(timeOut);
        };
    }, [position]);

    return pos;
};

export default usePlayer;

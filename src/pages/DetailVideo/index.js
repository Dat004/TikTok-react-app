import { useEffect, useState } from 'react';
import PageVideo from '../../layouts/PageVideo';
import config from '../../services';
import { UserAuth } from '../../components/Store';
import { useLocation } from 'react-router-dom';

function DetailVideo() {
    const location = useLocation();

    const [detailsVideo, setDetailsVideo] = useState({});
    const { tokenStr } = UserAuth();

    const handleGetInfoVideo = async () => {
        const data = await config.getAVideo(
            location.pathname.split('/')[2] ?? window.location.pathname.split('/')[2],
            tokenStr,
        );

        setDetailsVideo(data);
    };

    useEffect(() => {
        handleGetInfoVideo();
    }, []);

    if (Object.keys(detailsVideo).length === 0) {
        return;
    }

    return (
        <div style={{ width: '100%', minHeight: '100vh' }}>
            <PageVideo data={detailsVideo} />
        </div>
    );
}

export default DetailVideo;

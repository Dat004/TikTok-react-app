import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ViewFollowing.module.scss';

import config from '../../services';
import Video from './Video';

const cx = classNames.bind(styles);

function ViewFollowing() {
    const [idVideo, setIdVideo] = useState(0);
    const [listSuggest, setListSuggest] = useState([]);

    const PAGE = 1;
    const PER_PAGE = 18;

    useEffect(() => {
        const fetchApi = async () => {
            const data = await config.suggest(PAGE, PER_PAGE);

            setListSuggest(data);
        };

        fetchApi();
    }, [PAGE]);

    useEffect(() => {
        if (idVideo) {
            const playPromise = idVideo.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((error) => {});
            }
        }

        return () => {
            if (idVideo) {
                idVideo.pause();
            }
        };
    }, [idVideo]);

    if (listSuggest.length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('div-container')}>
                {listSuggest.map((data, index) => (
                    <Video
                        key={data.id}
                        data={data}
                        index={index}
                        state={[setIdVideo]}
                        src={data.popular_video.thumb_url}
                        thumb={data.popular_video.file_url}
                    />
                ))}
            </div>
        </div>
    );
}

export default ViewFollowing;

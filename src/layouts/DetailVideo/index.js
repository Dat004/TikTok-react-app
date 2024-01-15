import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './DetailVideo.module.scss';

import { MusicIcon } from '../../components/CustomIcon';
import { UserAuth } from '../../components/Store';
import ListComments from '../../components/ListComments';
import Image from '../../components/Image';
import Button from '../../components/Button';
import VideoPlayer from './VideoPlayer';
import config from '../../services';

const cx = classNames.bind(styles);

function DetailVideo({ data }) {
    const textareaRef = useRef();
    const location = useLocation();

    const idVideo = location.pathname.split('/')[2];

    const [commensCount, setCommensCount] = useState(data?.comments_count);
    const [getDataComments, setGetDataComments] = useState([]);
    const [valueText, setValueText] = useState('');

    const { tokenStr, userAuth, setOpenFormLogin } = UserAuth();

    useEffect(() => {
        handleGetComments();
    }, []);

    const handleGetComments = async () => {
        if (!tokenStr && !userAuth) {
            return;
        }

        const data = await config.comment(idVideo, tokenStr);

        setGetDataComments(data);
    };

    const handlePostComment = async () => {
        if (!valueText) {
            return;
        }

        await config.postComments(idVideo, valueText, tokenStr);
        handleGetComments(idVideo);

        setValueText('');
        setCommensCount((prev) => prev + 1);
        textareaRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handlePostComment();
        }
    };

    const handleChangeValueText = (e) => {
        e.target.style.height = 'auto';

        const value = e.target.value;
        const heightScroll = e.target.scrollHeight;

        if (value.startsWith(' ')) {
            return;
        }

        e.target.style.height = heightScroll + 2 + 'px';

        setValueText(value);
    };

    const handleOpenFormLogin = (e) => {
        e.preventDefault();

        setOpenFormLogin(true);
    };

    return (
        <div className={cx('container-detailvideo')}>
            <div className={cx('container')}>
                <div className={cx('videoplayer-container')}>
                    <div className={cx('video-content')}>
                        <VideoPlayer data={data} />
                        <div className={cx('info-detail')}>
                            <div className={cx('user-detail')}>
                                <div className={cx('user-info')}>
                                    <div className={cx('user-avatar')}>
                                        <Image src={data?.user?.avatar} alt={data?.user?.nickname} />
                                    </div>
                                    <div className={cx('name-user')}>
                                        <h2 className={cx('nickname')}>{data?.user?.nickname}</h2>
                                        <p className={cx('username')}>
                                            {data?.user?.first_name + ' ' + data?.user?.last_name}
                                            <span> · </span>
                                            <span className={cx('time-uploaded')}>
                                                {data?.updated_at?.split(' ')[0]}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <Button className={cx('followbtn-user')} primary medium>
                                    Follow
                                </Button>
                            </div>
                            <p className={cx('description')}>{data?.description}</p>
                            {data.music && (
                                <p className={cx('info-music')}>
                                    <MusicIcon />
                                    {data?.music}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className={cx('comment-content')}>
                        <h1 className={cx('comment-title')}>
                            <span className={cx('comment-total')}>{commensCount}</span>
                            comments
                        </h1>
                        <div className={cx('post-content')}>
                            {userAuth && tokenStr && (
                                <div className={cx('avatar-user')}>
                                    <Image src={userAuth.avatar} />
                                </div>
                            )}
                            <form className={cx('post-form')}>
                                <div className={cx('form-input')}>
                                    <textarea
                                        ref={textareaRef}
                                        onKeyDown={handleKeyDown}
                                        onChange={handleChangeValueText}
                                        value={valueText}
                                        placeholder="Add comments..."
                                        rows="1"
                                        spellCheck={false}
                                    />
                                </div>
                                <Button
                                    onClick={tokenStr && userAuth ? handlePostComment : handleOpenFormLogin}
                                    className={cx('btn-post')}
                                    disabled={valueText.length === 0 ? true : false}
                                >
                                    Post
                                </Button>
                            </form>
                        </div>
                        <div className={cx('list-container')}>
                            {getDataComments.map((items, index) => (
                                <ListComments
                                    data={items}
                                    key={items.id}
                                    className={cx('loading-content')}
                                    index={index}
                                    creator={data?.user?.id}
                                    setGetDataComments={setGetDataComments}
                                    setCommensCount={setCommensCount}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <aside className={cx('sidebar-videos')}></aside>
            </div>
        </div>
    );
}

export default DetailVideo;

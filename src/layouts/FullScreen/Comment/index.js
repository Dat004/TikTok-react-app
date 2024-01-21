import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

import {
    EmbedIcon,
    FacebookIcon,
    FlyIcon,
    PhoneIcon,
    TwitterRoundIcon,
    CheckIcon,
    CommentIcon,
    FavouriteIcon,
    LoveIcon,
    MusicIcon,
    LovedIcon,
    EllipsesHozironIcon,
} from '../../../components/CustomIcon';
import { UserAuth, UserNotify, UserVideo } from '../../../components/Store';
import { Wrapper } from '../../../components/Popper';
import config from '../../../services';
import Button from '../../../components/Button';
import Image from '../../../components/Image';
import ListComments from '../../../components/ListComments';
import TextBox from '../../../components/TextBox';

const cx = classNames.bind(styles);

const DATA_MENUS = [
    {
        title: 'Embed',
        type: 'Share',
        icon: <EmbedIcon />,
    },
    {
        title: 'Share with my friends',
        type: 'Share',
        icon: <FlyIcon />,
    },
    {
        title: 'Share with Facebook',
        type: 'Share',
        icon: <FacebookIcon width="2.4rem" height="2.4rem" />,
    },
    {
        title: 'Share with WhatsApp',
        type: 'Share',
        icon: <PhoneIcon />,
    },
    {
        title: 'Share with Twitter',
        type: 'Share',
        icon: <TwitterRoundIcon />,
    },
];

function Comment({ urlPath = '', data = {}, idVideo, statePosition = [], listVideoState = [] }) {
    const textareaRef = useRef();

    const [getDataComments, setGetDataComments] = useState([]);
    const [valueComments, setValueComments] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isFollow, setIsFollow] = useState(data?.user?.is_followed);
    const [commensCount, setCommensCount] = useState(data?.comments_count);

    const [listVideos, setListVideos] = listVideoState;
    const [positionVideo, setPositionVideo] = statePosition;

    const { tokenStr, userAuth, setOpenFormLogin, setOpenFullVideo, setOpenFormDelete, setDataForm } = UserAuth();
    const { likeVideo, setLikeVideo, likesCount, setLikesCount, setListVideoHome, setProfileUser } = UserVideo();
    const { setInfoNotify } = UserNotify();

    useEffect(() => {
        setCommensCount(data?.comments_count);
        setIsFollow(data?.user?.is_followed);
        setLikeVideo(data?.is_liked);
        setLikesCount(data?.likes_count);
    }, [data]);

    const fetchCommentsApi = async () => {
        if (!tokenStr && !userAuth) {
            return;
        }

        const data = await config.comment(idVideo, tokenStr);

        setGetDataComments(data);
    };

    useEffect(() => {
        fetchCommentsApi();
    }, [positionVideo, listVideos]);

    const handleCopyText = async () => {
        setLoading(true);

        await navigator.clipboard.writeText(urlPath);

        setInfoNotify({
            content: 'Copied text!',
            delay: 1500,
            isNotify: true,
        });

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 400);

        setTimeout(() => {
            setSuccess(false);
        }, 700);
    };

    const handleLikeVideo = async () => {
        const idVideo = data?.id;

        if (!likeVideo) {
            const res = await config.likeVideo(idVideo, tokenStr);

            setLikeVideo(res?.data?.is_liked);

            setLikesCount(res?.data?.likes_count);
        } else {
            const res = await config.unLikeVideo(idVideo, tokenStr);

            setLikeVideo(res?.data?.is_liked);

            setLikesCount(res?.data?.likes_count);
        }
    };

    const handleOpenFormDelete = (desVideo, idVideo) => {
        const currentLength = listVideos.length - 1;

        setDataForm({
            title: 'Bạn có chắc chắn muốn xóa video này?',
            handle: async () => {
                // const data = await config.deleteVideo(desVideo, idVideo, tokenStr);

                // if (data.Error) {
                //     setInfoNotify({
                //         content: 'Unable to delete video. Try again later!',
                //         delay: 1500,
                //         isNotify: true,
                //     });
                //     setOpenFormDelete(false);
                // } else {

                // Test delete video not use api
                setListVideos((prev) => [...prev.filter((i) => i.id !== idVideo)]);
                setListVideoHome((prev) => [...prev.filter((i) => i.id !== idVideo)]);
                setInfoNotify({
                    content: 'Deleted your video!',
                    delay: 1500,
                    isNotify: true,
                });
                if (positionVideo === currentLength) {
                    setPositionVideo((prev) => prev - 1);
                }
                setOpenFormDelete(false);
                // }
            },
        });
        setOpenFormDelete(true);
    };

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handlePostComment = async () => {
        if (!valueComments) {
            return;
        };

        const data = await config.postComments(idVideo, valueComments, tokenStr);

        if (data.Error) {
            setInfoNotify({
                content: 'You cannot post comment',
                delay: 1500,
                isNotify: true,
            });
        } else {
            setInfoNotify({
                content: 'Your comment posted!',
                delay: 1500,
                isNotify: true,
            });

            setCommensCount((prev) => prev + 1);
            fetchCommentsApi();
        }

        // prettierText();
        setValueComments('');
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();

            handlePostComment();
        }
    };

    const handleChangeValue = (e) => {
        if (e.target.value.startsWith(' ')) {
            return;
        };

        setValueComments(e.target.value);
    };

    return (
        <div className={cx('container-comments')}>
            <header className={cx('header')}>
                <div className={cx('container-info')}>
                    <div className={cx('info-user')}>
                        <div className={cx('user')}>
                            <Link
                                to={`/@${data?.user?.nickname}`}
                                onClick={() => {
                                    setOpenFullVideo(false);
                                    window.history.replaceState(null, '', `/@${data?.user?.nickname}`);
                                }}
                                className={cx('avatar-user')}
                            >
                                <Image src={data?.user?.avatar} alt={data?.user?.nickname} />
                            </Link>
                            <div className={cx('name')}>
                                <Link
                                    to={`/@${data?.user?.nickname}`}
                                    onClick={() => {
                                        setOpenFullVideo(false);
                                        window.history.replaceState(null, '', `/@${data?.user?.nickname}`);
                                    }}
                                    className={cx('nickname-head')}
                                >
                                    {data?.user?.nickname}
                                </Link>
                                <p className={cx('username')}>
                                    {data?.user?.first_name + ' ' + data?.user?.last_name}
                                    <span> · </span>
                                    {data?.published_at && (
                                        <span className={cx('time')}>{data?.published_at.split(' ')[0]}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        {userAuth.id === data?.user?.id ? (
                            <div>
                                <TippyHeadless
                                    delay={[0, 500]}
                                    placement="bottom-end"
                                    interactive
                                    arrow
                                    render={(attrs) => (
                                        <div tabIndex="-1" {...attrs}>
                                            <Wrapper className={cx('container')}>
                                                <Button className={cx('video-setting')}>Cài đặt quyền riêng tư</Button>
                                                <Button
                                                    onClick={() => handleOpenFormDelete(data?.description, data?.id)}
                                                    className={cx('video-setting')}
                                                >
                                                    Xóa
                                                </Button>
                                            </Wrapper>
                                        </div>
                                    )}
                                >
                                    <Button className={cx('btn-more')}>
                                        <EllipsesHozironIcon />
                                    </Button>
                                </TippyHeadless>
                            </div>
                        ) : (
                            <Button
                                className={cx('btn-follow', {
                                    'btn-unfollow': isFollow,
                                })}
                                primary
                                medium
                            >
                                {isFollow ? 'Following' : 'Follow'}
                            </Button>
                        )}
                    </div>
                    <p className={cx('info-description')}>{data?.description}</p>
                    {data?.music && (
                        <div className={cx('info-music')}>
                            <MusicIcon />
                            {data?.music}
                        </div>
                    )}
                </div>
                <div className={cx('container-actions')}>
                    <div className={cx('action-video')}>
                        <div className={cx('handler')}>
                            <div className={cx('actions')}>
                                <Button
                                    onClick={!tokenStr && !userAuth ? handleOpenFormLogin : handleLikeVideo}
                                    className={cx('btn-action')}
                                >
                                    {likeVideo ? (
                                        <LovedIcon width="2rem" height="2rem" />
                                    ) : (
                                        <LoveIcon width="2rem" height="2rem" />
                                    )}
                                </Button>
                                <span className={cx('counts')}>{likesCount}</span>
                            </div>
                            <div className={cx('actions')}>
                                <Button className={cx('btn-action')}>
                                    <CommentIcon width="2rem" height="2rem" />
                                </Button>
                                <span className={cx('counts')}>{commensCount}</span>
                            </div>
                            <div className={cx('actions')}>
                                <Button className={cx('btn-action')}>
                                    <FavouriteIcon width="2rem" height="2rem" />
                                </Button>
                                <span className={cx('counts')}>{data?.shares_count}</span>
                            </div>
                        </div>
                        <div className={cx('apps-share')}>
                            {DATA_MENUS.map((items, index) => (
                                <div key={index}>
                                    <Tippy interactive content={items.title}>
                                        <div className={cx('share-icon')}>{items.icon}</div>
                                    </Tippy>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('action-coppy')}>
                        <p className={cx('link')}>{urlPath}</p>
                        <Button onClick={handleCopyText} className={cx('btn-coppy')}>
                            {!loading && !success && <span>Copy link</span>}
                            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                            {success && !loading && <CheckIcon />}
                        </Button>
                    </div>
                </div>
            </header>
            <aside className={cx('content')}>
                <div className={cx('content-container')}>
                    <div className={cx('tab-wrapper')}>
                        <div className={cx('tab-items')}>
                            <p className={cx('tab-title')}>
                                Bình luận
                                <span>({data?.comments_count})</span>
                            </p>
                        </div>
                    </div>
                    <div className={cx('wrapper-comments')}>
                        {getDataComments.map((items, index) => (
                            <ListComments
                                key={items.id}
                                data={items}
                                index={index}
                                isCreator={data?.user?.id === items.user.id}
                                setDataComments={setGetDataComments}
                                setCommensCount={setCommensCount}
                            />
                        ))}
                    </div>
                </div>
            </aside>
            <footer className={cx('footer-comments')}>
                <div className={cx('container-footer')}>
                    <TextBox
                        ref={textareaRef}
                        onChange={handleChangeValue}
                        onClick={handlePostComment}
                        onKeyDown={handleKeyDown}
                        setTextValue={setValueComments}
                        textValue={valueComments}
                    />
                </div>
            </footer>
        </div>
    );
};

Comment.propTypes = {
    urlPath: PropTypes.string,
    data: PropTypes.object,
    idVideo: PropTypes.number,
    statePosition: PropTypes.array,
    listVideoState: PropTypes.array,
};

export default Comment;

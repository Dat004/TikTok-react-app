import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './ListComments.module.scss';

import {
    DeleteIcon,
    EditIcon,
    EllipsesHozironIcon,
    LoveTransparencyIcon,
    LovedIcon,
    ReportIcon,
} from '../CustomIcon';
import { UserAuth, UserNotify } from '../Store';
import { Wrapper } from '../Popper';
import config from '../../services';
import Image from '../Image';
import LoadingElement from '../LoadingElement';
import TextBox from '../TextBox';

const cx = classNames.bind(styles);

function ListComments({ data = {}, className, index, isCreator = false, setDataComments = () => {}, setCommensCount = () => {} }) {
    const textareaRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [likeComments, setLikeComments] = useState(data?.is_liked);
    const [likeCounts, setLikeCounts] = useState(data?.likes_count);
    const [valueComments, setValueComments] = useState(data?.comment);
    const [timeUpdateComment, setTimeUpdateComment] = useState(data?.updated_at.split(' ')[0]);
    const [textValues, setTextValues] = useState('');
    const [isEditText, setIsEditText] = useState(false);

    const { tokenStr, userAuth, setOpenFullVideo, setOpenFormLogin, setOpenFormDelete, setDataForm } = UserAuth();
    const { setInfoNotify } = UserNotify();

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 700);
    }, []);

    const handleDirectionPage = (data) => {
        setOpenFullVideo(false);
        window.history.replaceState(null, '', `/@${data.user.nickname}`);
    };

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handleLikeComment = async (idComment) => {
        if (likeComments) {
            const res = await config.unLikeComment(idComment, tokenStr);

            setLikeComments(res?.data?.is_liked);
            setLikeCounts(res?.data?.likes_count);
        } else {
            const res = await config.likeComment(idComment, tokenStr);

            setLikeComments(res?.data?.is_liked);
            setLikeCounts(res?.data?.likes_count);
        }
    };

    const handleOpenFormDelete = (contentComment, idComment) => {
        setDataForm({
            title: 'Bạn có chắc chắn muốn xóa bình luận này?',
            handle: async () => {
                await config.deleteComment(contentComment, idComment, tokenStr);

                setInfoNotify({
                    content: 'Deleted your comment!',
                    delay: 3000,
                    isNotify: true,
                });
                setDataComments((prev) => prev.filter((_, i) => i !== index));
                setCommensCount((prev) => prev - 1);
                setOpenFormDelete(false);
            },
        });
        setOpenFormDelete(true);
    };

    const handleSubmitUpdateComment = () => {
        const idComment = data?.id;

        if (!textValues || textValues === valueComments) {
            return;
        }

        const fetchUpdate = async () => {
            const data = await config.updateComments(textValues, idComment, tokenStr);

            if (data.Error) {
                setInfoNotify({
                    content: 'Unable to update comments. Try again later!',
                    delay: 1500,
                    isNotify: true,
                });
                setIsEditText(false);
            } else {
                setInfoNotify({
                    content: 'Update comments successfully',
                    delay: 1500,
                    isNotify: true,
                });
                setIsEditText(false);
                setTextValues(data.data.comment);
                setValueComments(data.data.comment);
                setTimeUpdateComment(data.data?.updated_at.split(' ')[0]);
            }
        };

        fetchUpdate();
    };

    const handleEditComment = (contentComment) => {
        setTextValues(contentComment);
        setIsEditText(true);
    };

    const handleCancleEditComment = (e) => {
        if (e.keyCode === 27) {
            e.preventDefault();

            setIsEditText(false);
        } else if (e.keyCode === 13) {
            e.preventDefault();

            handleSubmitUpdateComment();
        }
    };

    const handleChangeValues = (e) => {
        if (e.target.value.startsWith(' ')) {
            return;
        }

        setTextValues(e.target.value);
    };

    return (
        <div className={cx('wrapper-comments')}>
            <div key={data?.id} className={cx('comment-items')}>
                {!isLoading ? (
                    <div className={cx('comment-container')}>
                        <div key={data?.id} className={cx('user-comment')}>
                            <Link
                                onClick={() => handleDirectionPage(data)}
                                to={`/@${data?.user?.nickname}`}
                                className={cx('user-avatar')}
                            >
                                <Image src={data?.user.avatar} alt={data?.user.nickname} />
                            </Link>
                            {!isEditText ? (
                                <div className={cx('user-info')}>
                                    <Link
                                        onClick={() => handleDirectionPage(data)}
                                        to={`/@${data?.user?.nickname}`}
                                        className={cx('nickname')}
                                    >
                                        {data?.user?.nickname}
                                        {isCreator && (
                                            <span className={cx('comment-creator')}> · Creator</span>
                                        )}
                                    </Link>
                                    <p className={cx('text-content')}>{valueComments}</p>
                                    <div className={cx('subcontent')}>
                                        <p className={cx('text-bottom')}>{timeUpdateComment}</p>
                                        <p
                                            className={cx('text-bottom', {
                                                'actions-comments': true,
                                            })}
                                        >
                                            Reply
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('text-form')}>
                                    <TextBox
                                        ref={textareaRef}
                                        onClick={handleSubmitUpdateComment}
                                        onChange={handleChangeValues}
                                        onKeyDown={handleCancleEditComment}
                                        setTextValue={setTextValues}
                                        textValue={textValues}
                                    />
                                    <label className={cx('cancle-edit')} aria-label="Nhấn Esc để huỷ">
                                        Nhấn Esc để <span onClick={() => setIsEditText(false)}>huỷ</span>
                                    </label>
                                </div>
                            )}
                        </div>
                        {!isEditText && (
                            <div className={cx('action-comments')}>
                                <div className={cx('like-comment')}>
                                    <div>
                                        <TippyHeadless
                                            delay={[100, 200]}
                                            interactive
                                            placement="bottom-end"
                                            render={(attrs) => (
                                                <div tabIndex="-1" {...attrs}>
                                                    <Wrapper className={cx('container-wrapper')}>
                                                        {data?.user?.id === userAuth.id ? (
                                                            <>
                                                                <div
                                                                    onClick={() => handleEditComment(valueComments)}
                                                                    className={cx('item-wrapper')}
                                                                >
                                                                    <EditIcon />
                                                                    <span className={cx('item-title')}>Edit</span>
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        handleOpenFormDelete(data?.comment, data?.id)
                                                                    }
                                                                    className={cx('item-wrapper')}
                                                                >
                                                                    <DeleteIcon />
                                                                    <span className={cx('item-title')}>Delete</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div
                                                                onClick={() =>
                                                                    handleOpenFormDelete(data?.comment, data?.id)
                                                                }
                                                                className={cx('item-wrapper')}
                                                            >
                                                                <ReportIcon />
                                                                <span className={cx('item-title')}>Report</span>
                                                            </div>
                                                        )}
                                                    </Wrapper>
                                                </div>
                                            )}
                                        >
                                            <div className={cx('more-btn')}>
                                                <EllipsesHozironIcon />
                                            </div>
                                        </TippyHeadless>
                                    </div>
                                    <div
                                        onClick={() =>
                                            tokenStr && userAuth ? handleLikeComment(data?.id) : handleOpenFormLogin()
                                        }
                                        className={cx('like-btn')}
                                    >
                                        {likeComments ? (
                                            <LovedIcon width="2rem" height="2rem" />
                                        ) : (
                                            <LoveTransparencyIcon />
                                        )}
                                    </div>
                                    <span className={cx('likes-count')}>{likeCounts}</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={cx('loading-container')}>
                        <LoadingElement className={cx('loading-avatar')}></LoadingElement>
                        <div className={cx('load-content')}>
                            <LoadingElement className={cx('loading-info')}></LoadingElement>
                            <LoadingElement
                                className={cx('loading-des', {
                                    [className]: className && true,
                                })}
                            ></LoadingElement>
                            <LoadingElement className={cx('loading-time')}></LoadingElement>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ListComments.propTypes = {
    data: PropTypes.object.isRequired,
    isCreator: PropTypes.bool,
    index: PropTypes.number,
    className: PropTypes.string,
    setDataComments: PropTypes.func,
    setCommensCount: PropTypes.func,
};

export default ListComments;

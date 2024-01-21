import PropTypes from 'prop-types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDownIcon, CheckBoxIcon } from '../../CustomIcon';
import classNames from 'classnames/bind';
import styles from './FormMainUpload.module.scss';

import { UserAuth } from '../../Store';
import config from '../../../services';
import PhonePreviewVideo from './PhonePreviewVideo';
import CoverVideo from './CoverVideo';
import Button from '../../Button';

const cx = classNames.bind(styles);

const MODE_MENUS = [
    {
        type: 'mode',
        value: 'public',
    },
    {
        type: 'mode',
        value: 'friends',
    },
    {
        type: 'mode',
        value: 'private',
    },
];

function FormMainUpload({ src = '', nameFile = '' }) {
    const textRef = useRef(); 
    const modeRef = useRef([]);

    const [position, setPosition] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [dataLoading, setDataLoading] = useState(0);
    const [captionValue, setCaptionValue] = useState(nameFile);
    const [captureTimeLeakVideo, setCaptureTimeLeakVideo] = useState(0);
    const [modeViewer, setModeViewer] = useState('public');
    const [listThumbnails, setListThumbnails] = useState([]);
    const [checked, setChecked] = useState({
        comment: false,
        duet: false,
        stitch: false,
    });
    const [isShowTable, setIsShowTable] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isFile, setIsFile] = useState(src);

    const { userAuth, tokenStr, setDataForm, setOpenFormDiscard } = UserAuth();

    useEffect(() => {
        if (modeRef) {
            modeRef.current.map((mode, id) => {
                id === position
                    ? (mode.style.backgroundColor = 'rgba(22, 24, 35, 0.06)')
                    : (mode.style.backgroundColor = 'transparent');
            });
        }
    }, [position]);

    const handleInput = (e) => {
        textRef.current.style.height = 'auto';

        const currentValue = e.target.value;

        setCaptionValue(currentValue);

        const scrollHeight = textRef.current.scrollHeight;

        textRef.current.style.height = scrollHeight + 'px';
    };

    const handleShowTable = () => {
        setIsShowTable((prev) => !prev);
    };

    const handleSelectMode = (value, index) => {
        setModeViewer(value);
        setPosition(index);
    };

    const handleDiscardFile = useCallback(() => {
        setDataLoading(0);
        setIsFile('');
        setCaptionValue('');
        setListThumbnails([]);
        setIsPlay(false);
        setIsUploading(false);
        setOpenFormDiscard(false);

        URL.revokeObjectURL(isFile);
    });

    const handleOpenFormDiscard = () => {
        setDataForm({
            title: '',
            handle: handleDiscardFile,
        });
        setOpenFormDiscard(true);
    };

    const handleChangeChecked = (e, type) => {
        setChecked((prev) => ({ ...prev, [type]: e.target.checked }));
    };

    const handleUploadVideo = () => {
        const fetchApi = async () => {
            const data = await config.uploadVideo(
                captionValue.split('.')[0],
                isFile,
                captureTimeLeakVideo,
                `Nhạc nền - ${userAuth.first_name + ' ' + userAuth.last_name}`,
                modeViewer,
                checked,
                tokenStr,
            );

            // console.log(data);
        };

        fetchApi();
    };

    return (
        <div className={cx('wrapper-form')}>
            {/* <Header srcThumb={captureLeakVideo} caption={captionValue} duration={maxValue} /> */}
            <main className={cx('main-container')}>
                <div className={cx('main-content')}>
                    <header className={cx('header-title')}>
                        <h1>Upload Video</h1>
                        <h2>Post a video to your account</h2>
                    </header>
                    <section className={cx('section-content')}>
                        <PhonePreviewVideo
                            user={userAuth}
                            stateFiles={[isFile, setIsFile]}
                            stateCaption={[captionValue, setCaptionValue]}
                            stateVideo={[isPlay, setIsPlay]}
                            state={[maxValue, setMaxValue]}
                            stateUpload={[isUploading, setIsUploading]}
                            stateDataLoading={[dataLoading, setDataLoading]}
                            handleDiscardFile={handleDiscardFile}
                        />
                        <div className={cx('description-details')}>
                            <div className={cx('container-items')}>
                                <div className={cx('caption-title')}>
                                    <p className={cx('title-text')}>Caption</p>
                                    {captionValue && <p className={cx('length-text')}>{captionValue.length} / 2200</p>}
                                </div>
                                <div className={cx('container-form')}>
                                    <div className={cx('caption-form')}>
                                        <textarea
                                            value={captionValue.split('.')[0]}
                                            ref={textRef}
                                            className={cx('text-form')}
                                            rows={1}
                                            cols={65}
                                            spellCheck={false}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </div>
                            </div>
                            <CoverVideo
                                src={isFile}
                                stateList={[listThumbnails, setListThumbnails]}
                                stateValue={[maxValue, setMaxValue]}
                                stateTimeThumbnail={[setCaptureTimeLeakVideo]}
                            />
                            <div className={cx('container-items')}>
                                <div onClick={handleShowTable} className={cx('viewer')}>
                                    <p className={cx('title-text')}>Ai có thể xem video này</p>
                                    <div className={cx('mode-viewer')}>
                                        <p className={cx('title-value')}>{modeViewer}</p>
                                        <div className={cx('see-more')}>
                                            <ArrowDownIcon />
                                        </div>
                                    </div>
                                    <section
                                        className={cx('section-items', {
                                            'hidden-section': isShowTable,
                                        })}
                                    >
                                        {MODE_MENUS.map((modes, index) => (
                                            <span
                                                onClick={() => handleSelectMode(modes.value, index)}
                                                key={index}
                                                ref={(ref) => (modeRef.current[index] = ref)}
                                                className={cx('mode-item')}
                                            >
                                                {modes.value}
                                            </span>
                                        ))}
                                    </section>
                                </div>
                            </div>
                            <div className={cx('container-items')}>
                                <div className={cx('allow-user')}>
                                    <p className={cx('title-text')}>Cho phép người dùng:</p>
                                    <div className={cx('box-container')}>
                                        <div className={cx('box-item')}>
                                            <div className={cx('checkbox')}>
                                                <input
                                                    onChange={(e) => handleChangeChecked(e, 'comment')}
                                                    className={cx('input-checkbox')}
                                                    type="checkbox"
                                                />
                                                <div className={cx('checkbox-content')}>
                                                    <CheckBoxIcon />
                                                </div>
                                            </div>
                                            <p className={cx('title-box')}>Comment</p>
                                        </div>
                                        <div className={cx('box-item')}>
                                            <div className={cx('checkbox')}>
                                                <input
                                                    onChange={(e) => handleChangeChecked(e, 'duet')}
                                                    className={cx('input-checkbox')}
                                                    type="checkbox"
                                                />
                                                <div className={cx('checkbox-content')}>
                                                    <CheckBoxIcon />
                                                </div>
                                            </div>
                                            <p className={cx('title-box')}>Duet</p>
                                        </div>
                                        <div className={cx('box-item')}>
                                            <div className={cx('checkbox')}>
                                                <input
                                                    onChange={(e) => handleChangeChecked(e, 'stitch')}
                                                    className={cx('input-checkbox')}
                                                    type="checkbox"
                                                />
                                                <div className={cx('checkbox-content')}>
                                                    <CheckBoxIcon />
                                                </div>
                                            </div>
                                            <p className={cx('title-box')}>Stitch</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('container-items')}>
                                <div className={cx('running-protected')}>
                                    <p className={cx('title-text')}>Chạy quy trình kiểm tra bản quyền</p>
                                    <div className={cx('switch-check')}>
                                        <input className={cx('check-switch')} type="checkbox" />
                                        <div className={cx('progress-circle')}></div>
                                    </div>
                                </div>
                                <div className={cx('description')}>
                                    <span className={cx('policy-des')}>
                                        We’ll check your video for potential copyright infringements on used sounds. If
                                        infringements are found, you can edit the video before posting.
                                    </span>
                                </div>
                            </div>
                            <div className={cx('container-items')}>
                                <div className={cx('btn-container')}>
                                    <Button onClick={handleOpenFormDiscard} large primary className={cx('discard-btn')}>
                                        Discard
                                    </Button>
                                    <Button onClick={handleUploadVideo} large primary disabled={isFile ? false : true}>
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

FormMainUpload.propTypes = {
    src: PropTypes.string,
    nameFile: PropTypes.string,
};

export default FormMainUpload;

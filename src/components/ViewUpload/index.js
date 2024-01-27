import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ViewUpload.module.scss';

import { UploadIcon } from '../CustomIcon';
import Button from '../Button';
import FormMainUpload from './FormMainUpload';

const cx = classNames.bind(styles);

function ViewUpload() {
    const inputFileRef = useRef();

    const [isSelectedVideo, setIsSelectedVideo] = useState(false);
    const [isUrl, setIsUrl] = useState('');
    const [isFileName, setIsFileName] = useState('');

    const handleOpenFile = () => {
        inputFileRef.current.click();
    };

    const createUrlVideo = (e) => {
        const target = e.target.files;

        const url = URL.createObjectURL(target[0]);

        setIsUrl(url);
        setIsFileName(target[0].name);

        setIsSelectedVideo(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={cx('wrapper-upload')}>
            <div className={cx('container-upload')}>
                {isSelectedVideo ? (
                    <FormMainUpload src={isUrl} nameFile={isFileName} />
                ) : (
                    <div className={cx('layout')}>
                        <input
                            ref={inputFileRef}
                            onChange={createUrlVideo}
                            className={cx('input-file')}
                            type="file"
                            accept="video/*"
                            multiple
                        />
                        <div onClick={handleOpenFile} className={cx('content')}>
                            <UploadIcon />
                            <div className={cx('text-title')}>
                                <h1 className={cx('title')}>Select to video upload</h1>
                            </div>
                            <span className={cx('text-upload')}>Drags and drop files</span>
                            <span className={cx('text-upload')}>Support mp4, avi, webm and mov video formats</span>
                            <span className={cx('text-upload')}>720x1280 resolution or higher</span>
                            <span className={cx('text-upload')}>Up to 10 minutes</span>
                            <span className={cx('text-upload')}>Less than 10 GB</span>
                            <span className={cx('text-upload')}>Less than 30 videos</span>
                            <div className={cx('btn-container')}>
                                <Button className={cx('btn-selectfiles')} medium primary>
                                    Select Files
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewUpload;

import classNames from 'classnames/bind';
import styles from './FormMainUpload.module.scss';

import { CutIcon, MinusIcon, PlusIcon, SplitIcon } from '../../CustomIcon';
import Button from '../../Button';
import Image from '../../Image';

const cx = classNames.bind(styles);

function Header({ srcThumb = '', caption = '', duration }) {
    if (!srcThumb) {
        return;
    }

    return (
        <header className={cx('header-wrapper')}>
            <div className={cx('container-header')}>
                <div
                    className={cx('header-content', {
                        'left-header': true,
                    })}
                >
                    <div className={cx('video-info-edit')}>
                        <div className={cx('edit-card')}>
                            <Image className={cx('card-img')} src={srcThumb} alt="edit-img" />
                        </div>
                        <div className={cx('video-basic')}>
                            <p className={cx('text-caption')}>{caption}</p>
                            <span className={cx('time-video')}>00:00 - 00:{duration.toFixed(0)}</span>
                        </div>
                    </div>
                    <Button className={cx('btn-edit')} primary large>
                        <CutIcon className={cx('cut-icon')} />
                        Edit Video
                    </Button>
                </div>
                <div
                    className={cx('header-content', {
                        'right-header': true,
                    })}
                >
                    <div className={cx('split-body')}>
                        <span className={cx('split-title')}>Split into multiple parts to get more exposure</span>
                        <div className={cx('split-increment')}>
                            <div className={cx('actions')}>
                                <MinusIcon />
                            </div>
                            <div className={cx('counts-number')}>
                                <span className={cx('number')}>2</span>
                            </div>
                            <div className={cx('actions')}>
                                <PlusIcon />
                            </div>
                        </div>
                    </div>
                    <div className={cx('split-btn')}>
                        <Button className={cx('btn-split')} medium outline disabled>
                            <SplitIcon />
                            Split
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

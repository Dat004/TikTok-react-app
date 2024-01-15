import classNames from 'classnames/bind';
import styles from './FooterSide.module.scss';

const cx = classNames.bind(styles);

function FooterSide() {
    return (
        <div className={cx('footer-page')}>
            <div className={cx('details-page')}>
                <span>About</span>
                <span>Newsroom</span>
                <span>Contact</span>
                <span>Careers</span>
            </div>
            <div className={cx('details-page')}>
                <span>TikTok for Good</span>
                <span>Advertise</span>
                <span>Developers</span>
                <span>Transparency</span>
                <span>TikTok Rewards</span>
                <span>TikTok Embeds</span>
            </div>
            <div className={cx('details-page')}>
                <span>Help</span>
                <span>Safety</span>
                <span>Terms</span>
                <span>Privacy</span>
                <span>Creator Potal</span>
                <span>Community Guidelines</span>
            </div>
            <div className={cx('details-page')}>
                <span>See more</span>
            </div>
            <div className={cx('details-page')}>
                <span>© 2023 TikTok</span>
            </div>
        </div>
    );
}

export default FooterSide;

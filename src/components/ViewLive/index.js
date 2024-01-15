import classNames from 'classnames/bind';
import styles from './ViewLive.module.scss';
import LoadingElement from '../LoadingElement';

const cx = classNames.bind(styles);

function ViewLive() {
    return (
        <section className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('count-view')}>
                    <LoadingElement width='50px' height='25px'/>
                </div>
                <div className={cx('info')}>
                    <h2 className={cx('title')}>LIVE</h2>
                    <div className={cx('username')}>
                        <LoadingElement width='180px' height='20px' />
                    </div>
                    <div className={cx('description')}>
                        <LoadingElement width='350px' height='20px' />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ViewLive;

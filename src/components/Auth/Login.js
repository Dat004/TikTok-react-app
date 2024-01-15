import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import { Wrapper } from '../Popper';
import FormPages from './FormPages';
import { CloseTabs } from '../Control';
import { UserAuth } from '../Store/AuthContext';

const cx = classNames.bind(styles);

function Form() {
    const {setOpenFormLogin} = UserAuth();

    const handleCloseForm = () => {
        setOpenFormLogin(false);
    }

    return (
        <div className={cx('form-wrapper')}>
            <Wrapper className={cx('form')}>
                <div className={cx('tab-control')}>
                    <CloseTabs className={cx('close-btn')} onClick={handleCloseForm} />
                </div>
                <FormPages />
            </Wrapper>
        </div>
    );
}

export default Form;

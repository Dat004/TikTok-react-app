import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import { Wrapper } from '../Popper';
import Button from '../Button';
import { UserAuth } from '../Store';

const cx = classNames.bind(styles);

function DiscardForm() {
    const { dataForm, setOpenFormDiscard } = UserAuth();

    const handleCloseForm = () => {
        setOpenFormDiscard(false);
    };

    return (
        <div className={cx('form-wrapper')}>
            <section className={cx('discard-form')}>
                <Wrapper className={cx('modal-form')}>
                    <h1
                        className={cx('title', {
                            'discard-title': true,
                        })}
                    >
                        {dataForm.title || 'Discard this post?'}
                    </h1>
                    <p className={cx('des-form')}>The video and all edits will be discarded.</p>
                    <div className={cx('modal-btn')}>
                        <Button onClick={() => dataForm.handle()} className={cx('btn-form-discard')} primary large>
                            Discard
                        </Button>
                        <Button
                            className={cx('btn-form-discard', {
                                'btn-cancel': true,
                            })}
                            onClick={handleCloseForm}
                            primary
                            large
                        >
                            Continue editing
                        </Button>
                    </div>
                </Wrapper>
            </section>
        </div>
    );
}

export default DiscardForm;

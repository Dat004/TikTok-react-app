import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import config from '../../services';
import { UserAuth } from '../Store';
import { CloseTabs } from '../Control';
import { Wrapper } from '../Popper';
import Button from '../Button';
import TextBox from '../TextBox';

const cx = classNames.bind(styles);

function UpdateForm() {
    const { userAuth, tokenStr, setOpenFormEdit } = UserAuth();

    const data_user = {
        myWebsite: userAuth.website_url,
        firstName: userAuth.first_name,
        lastName: userAuth.last_name,
        bio: userAuth.bio,
    };

    const [valueFirstName, setValueFirstName] = useState(data_user.firstName);
    const [valueLastName, setValueLastName] = useState(data_user.lastName);
    const [valueWebsite, setValueWebsite] = useState(data_user.myWebsite);
    const [valueBiO, setValueBiO] = useState(data_user.bio);

    const MAX_LENGTH = 80;

    const DATA_FORM = [
        {
            id: 0,
            title: 'First Name',
            type: 'input',
            value: valueFirstName,
            des: 'Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.',
        },
        {
            id: 1,
            title: 'Last Name',
            type: 'input',
            value: valueLastName,
            des: 'Bạn chỉ có thể thay đổi biệt danh 7 ngày một lần.',
        },
        {
            id: 2,
            title: 'Website URL',
            type: 'input',
            value: valueWebsite,
            des: 'URL tới website của bạn.',
        },
        {
            id: 3,
            title: 'BiO',
            type: 'textarea',
            value: valueBiO,
            maximum: MAX_LENGTH,
        },
    ];

    const handleUpdateUser = () => {
        const fetchApi = async () => {
            const data = await config.update(tokenStr, valueFirstName, valueLastName, valueWebsite, valueBiO);

            window.location.reload();
        };

        fetchApi();
    };

    const handleChangeValue = (e, index) => {
        if (index === 0 && DATA_FORM[index].id === 0) {
            setValueFirstName(e.target.value);
        } else if (index === 1 && DATA_FORM[index].id === 1) {
            setValueLastName(e.target.value);
        } else if (index === 2 && DATA_FORM[index].id === 2) {
            setValueWebsite(e.target.value);
        } else {
            setValueBiO(e.target.value);
        }
    };

    const handleCloseForm = () => {
        setOpenFormEdit(false);
    };

    return (
        <div className={cx('form-wrapper')}>
            <section className={cx('modal-update')}>
                <Wrapper className={cx('main')}>
                    <header className={cx('header-update')}>
                        <h1 className={cx('header-title')}>Sửa hồ sơ</h1>
                        <div>
                            <CloseTabs onClick={handleCloseForm} />
                        </div>
                    </header>
                    <div className={cx('modal-content')}>
                        {DATA_FORM.map((item, index) => (
                            <div key={index} className={cx('items-container')}>
                                <div className={cx('items-title')}>
                                    <h4>{item.title}</h4>
                                </div>
                                <div className={cx('update-content')}>
                                    {item.type === 'input' && (
                                        <input
                                            onChange={(e) => handleChangeValue(e, index)}
                                            value={item.value}
                                            type="text"
                                            placeholder="abc"
                                            spellCheck
                                        />
                                    )}
                                    {item.type === 'textarea' && <TextBox />}
                                    {item.textLink && <p className={cx('link-prfile')}>{item.textLink}</p>}
                                    {item.des && <p className={cx('des-policy')}>{item.des}</p>}
                                    {item.maximum && <p className={cx('des-maximum')}>{item.maximum}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <footer className={cx('footer-update')}>
                        <Button onClick={handleCloseForm} outline medium className={cx('btn-form-update')}>
                            Cancle
                        </Button>
                        <Button
                            onClick={handleUpdateUser}
                            disabled={
                                valueFirstName === data_user.firstName &&
                                valueLastName === data_user.lastName &&
                                valueWebsite === data_user.myWebsite &&
                                valueBiO === data_user.bio
                                    ? true
                                    : false
                            }
                            outline
                            medium
                            className={cx('btn-form-update', {
                                'btn-form-save': true,
                            })}
                        >
                            Save
                        </Button>
                    </footer>
                </Wrapper>
            </section>
        </div>
    );
}
export default UpdateForm;

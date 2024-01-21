import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';

import MenuItem from './MenuItems';
import Wrapper from '../Wrapper';
import Header from './Header';
import { UserAuth } from '../../Store/AuthContext';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const { setOpenFormLogout } = UserAuth();

    const [history, setHistory] = useState([{ data: items }]);

    const FinalPosition = history[history.length - 1];

    const checkLength = history.length > 1 && 'lan-btn';

    const renderItems = () => {
        return FinalPosition.data.map((value, index) => {
            const isParents = !!value.children;

            return (
                <MenuItem
                    className={cx('menu-items', {
                        separate: value.separate,
                        [checkLength]: checkLength,
                    })}
                    key={index}
                    data={value}
                    onClick={() => {
                        if (isParents) {
                            setHistory((prev) => [...prev, value.children]);
                        } else if(value.component) {
                            setOpenFormLogout(true);
                        } 
                    }}
                />
            );
        });
    };

    return (
        <div>
            <Tippy
                // visible
                delay={[0, 750]}
                offset={[12, 8]}
                interactive
                placement="bottom-end"
                hideOnClick={false}
                onHide={() => {
                    if (history.length < 2) {
                        return 0;
                    } else {
                        setHistory(history.slice(0, history.length - 1));
                    }
                }}
                render={(attrs) => (
                    <div className={cx('menu-lists')} tabIndex="-1" {...attrs}>
                        <Wrapper widthBox="227px" heigtBox="640px">
                            {history.length > 1 && (
                                <Header
                                    title={FinalPosition.title}
                                    onBack={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
                                />
                            )}
                            <div className={cx('menu-scroll')}>{renderItems()}</div>
                        </Wrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired
};

export default Menu;

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { SearchIcon } from '../../../components/CustomIcon';
import { Wrapper as WrapperPopper } from '../../../components/Popper';
import { useDebounce } from '../../../hooks';
import AccountItems from '../../../components/AccountItem';
import config from '../../../services';

const cx = classNames.bind(styles);

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchValues, setSearchValues] = useState('');
    const [showResults, setShowResults] = useState(true);
    const [spinner, setSpinner] = useState(false);

    const inputRef = useRef();

    const debounce = useDebounce(searchValues, 750);

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResults([]);
            setSpinner(false);
            return;
        }

        const fetchApi = async () => {
            setSpinner(true);

            const get = await config.search(debounce);

            setSpinner(false);

            setSearchResults(get);
        };

        fetchApi();
    }, [debounce]);

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (searchValue.startsWith(' ')) {
            return;
        }

        setSearchValues(e.target.value);
    };

    return (
        <div>
            <TippyHeadless
                interactive
                visible={showResults && searchResults.length > 0}
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <WrapperPopper widthBox="100%">
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResults.map((data) => (
                                <AccountItems key={data.id} value={data} />
                            ))}
                        </WrapperPopper>
                    </div>
                )}
                onClickOutside={() => setShowResults(false)}
            >
                <div className={cx('search')}>
                    <div className={cx('form-input')}>
                        <input
                            value={searchValues}
                            ref={inputRef}
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                            required
                            onChange={handleChange}
                            onFocus={() => setShowResults(true)}
                        />
                        <div className={cx('tools')}>
                            {searchValues && !spinner && (
                                <button
                                    className={cx('clear')}
                                    onClick={() => {
                                        setSearchValues('');
                                        inputRef.current.focus();
                                        setSearchResults([]);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            )}
                            {spinner && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                        </div>
                        <span className={cx('seperate')}></span>

                        <button className={cx('btn-search')}>
                            <SearchIcon />
                        </button>

                        <span className={cx('fcs')}></span>
                    </div>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { UserAuth } from '../Store';
import SuggestedAccounts from './index';
import suggest from '../../services/accountSuggestService';

function Suggest({ headingTitle = '', footerTitle = '' }) {
    const INIT_PAGE = 1;
    const PER_PAGE = 5;

    const { tokenStr } = UserAuth();

    const [listAccountSuggested, setListAccountSuggest] = useState([]);
    const [numPages, setNumPages] = useState(INIT_PAGE);
    
    const handleSeeMoreAccounts = useCallback(() => {
        setNumPages((prev) => prev + 1);
    }, [numPages]);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await suggest(numPages, PER_PAGE, tokenStr);

            setListAccountSuggest((prev) => [...prev, ...data]);
        };

        fetchApi();
    }, [numPages]);

    return (
        <SuggestedAccounts
            headingTitle={headingTitle}
            footerTitle={footerTitle}
            data={listAccountSuggested}
            onClick={handleSeeMoreAccounts}
            isPreview
        />
    );
}

Suggest.propTypes = {
    headingTitle: PropTypes.string,
    footerTitle: PropTypes.string,
};

export default Suggest;

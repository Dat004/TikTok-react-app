import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { UserAuth } from '../Store/AuthContext';
import SuggestedAccounts from './index';
import config from '../../services';

function Following({ headingTitle = '', footerTitle = '' }) {
    const { tokenStr } = UserAuth();

    const INIT_PAGE = 1;

    const [listFollowingSuggest, setListFollwingSuggest] = useState([]);
    const [numPages, setNumPages] = useState(INIT_PAGE);

    const handleSeeMoreFollowing = useCallback(() => {
        setNumPages((prev) => prev + 1);
    });

    useEffect(() => {
        const fetchApi = async () => {
            const data = await config.following(numPages, tokenStr);

            setListFollwingSuggest((prev) => [...prev, ...data]);
        };

        fetchApi();
    }, [numPages]);

    return (
        <SuggestedAccounts
            headingTitle={headingTitle}
            footerTitle={footerTitle}
            data={listFollowingSuggest}
            onClick={handleSeeMoreFollowing}
        />
    );
}

Following.propTypes = {
    headingTitle: PropTypes.string,
    footerTitle: PropTypes.string,
};

export default Following;

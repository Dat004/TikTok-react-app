import * as callPath from '../utils/httpRequest';

export const followUser = async (id, token) => {
    try {
        const res = await callPath.post(`users/${id}/follow`, null, {
            headers: {
                Authorization: token,
            },
        });
        return res.data;
    } catch (error) {
        return { Error: error.response.status };
    }
};

export const unFollowUser = async (id, token) => {
    try {
        const res = await callPath.post(`users/${id}/unfollow`, null, {
            headers: {
                Authorization: token,
            },
        });
        return res.data;
    } catch (error) {
        return { Error: error.response.status };
    }
};

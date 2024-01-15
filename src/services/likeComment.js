import * as CallPath from '../utils/httpRequest';

export const likeComment = async (id, token) => {
    try {
        const res = await CallPath.post(`comments/${id}/like`, [], {
            headers: {
                Authorization: token,
            },
        });

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};

export const unLikeComment = async (id, token) => {
    try {
        const res = await CallPath.post(`comments/${id}/unlike`, [], {
            headers: {
                Authorization: token,
            },
        });

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};

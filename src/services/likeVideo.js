import * as CallPath from '../utils/httpRequest';

export const likeVideo = async (id, token) => {
    try {
        const res = await CallPath.post(
            `videos/${id}/like`,
            {},
            {
                headers: {
                    Authorization: token,
                },
            },
        );

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};

export const unLikeVideo = async (id, token) => {
    try {
        const res = await CallPath.post(
            `videos/${id}/unlike`,
            {},
            {
                headers: {
                    Authorization: token,
                },
            },
        );

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};

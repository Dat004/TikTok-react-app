import * as CallPath from '../utils/httpRequest';

const postComments = async (id, comment, token) => {
    try {
        const res = await CallPath.post(
            `videos/${id}/comments`,
            {
                comment,
            },
            {
                headers: {
                    Authorization: token,
                },
                params: {},
            },
        );

        return res.data;
    } catch (err) {
        return { Error: err.response.status };
    }
};

export default postComments;

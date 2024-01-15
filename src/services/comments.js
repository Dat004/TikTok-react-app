import * as callPath from '../utils/httpRequest';

const comments = async (id, token) => {
    try {
        const res = await callPath.get(`videos/${id}/comments`, {
            headers: {
                Authorization: token,
            }
        });

        return res.data;
    } catch (err) {
        return { errorCode: err.response.status };
    }
};

export default comments;

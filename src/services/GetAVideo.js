import * as callPath from '../utils/httpRequest';

const getAVideo = async (id, token) => {
    try {
        const res = await callPath.get(`videos/${id}`, {
            headers: {
                Authorization: token,
            },
        });

        return res.data;
    } catch (err) {
        return { errCode: err.response.status };
    }
};

export default getAVideo;

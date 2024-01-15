import * as CallPath from '../utils/httpRequest';

export const deleteVideo = async (desVideo, idVideo, token) => {
    try {
        const res = await CallPath.deleted(`videos/${idVideo}`, {
            headers: {
                Authorization: token,
            },
            data: {
                description: desVideo,
            },
        });

        return res.data;
    } catch (e) {
        return { Error: e.response.status };
    }
};

export const deleteComment = async (contentComment, idComment, token) => {
    try {
        const res = await CallPath.deleted(`comments/${idComment}`, {
            headers: {
                Authorization: token,
            },
            data: {
                comment: contentComment,
            },
        });

        return res.data;
    } catch (e) {
        return { Error: e.response.status };
    }
};

import * as CallPath from '../utils/httpRequest';

const updateComments = async (contentComment, idComment, token) => {
    try {
        const res = await CallPath.patch(
            `comments/${idComment}`,
            {
                comment: contentComment,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );

        return res.data;
    } catch (error) {
        return { Error: error.response.status };
    }
};

export default updateComments;

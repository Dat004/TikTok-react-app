import * as callPath from '../utils/httpRequest';

const following = async (page, token) => {
    try {
        const res = await callPath.get('me/followings', {
            headers: {
                Authorization: token,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default following;

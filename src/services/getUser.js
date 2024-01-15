import * as callPath from '../utils/httpRequest';

const user = async (nickname, token) => {
    try {
        // const res = await callPath.get(`/users/suggested?page=${numPage}&per_page=${perPage}`)
        const res = await callPath.get(`/users/${nickname}`, {
            headers: {
                Authorization: token,
            }
        });

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default user;

import * as callPath from '../utils/httpRequest';

const logout = async (token) => {
    try {
        const res = await callPath.post(
            'auth/logout',
            {},
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return res;
    } catch (err) {
        return { errorCode: err.response.status };
    }
};

export default logout;

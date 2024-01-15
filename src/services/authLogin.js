import * as callPath from '../utils/httpRequest';

const login = async (email, password) => {
    try {
        const res = await callPath.post('/auth/login', {
            email,
            password,
        });

        return res.data;
    } catch (err) {
        return {errCode: err.response.status};
    }
};

export default login;

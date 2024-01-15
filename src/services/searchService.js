import * as callPath from '../utils/httpRequest';

const search = async (q, type = 'less') => {
    try {
        const res = await callPath.get('users/search', {
            params: {
                q: q,
                type: type,
            },
        })
        return res.data;
    }
    catch(err) { 
        console.log(err);
    }
};

export default search;
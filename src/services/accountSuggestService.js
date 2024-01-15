import * as callPath from '../utils/httpRequest'

const suggest = async (numPage, perPage, token) => {
    try {
        // const res = await callPath.get(`/users/suggested?page=${numPage}&per_page=${perPage}`)
        const res = await callPath.get('/users/suggested', {
            params: {
                page: numPage,
                per_page: perPage
            }, headers: {
                Authorization: token
            }
        }); 

        return res.data;
    }
    catch(err) {
        console.log(err);
    }
};

export default suggest;
import * as callPath from '../utils/httpRequest';

const update = async (token, firstName, lastName, websiteUrl, bio) => {
    // console.log(token, firstName, lastName, websiteUrl, bio);

    try { 
        const res = await callPath.patch('auth/me?', {
                first_name: firstName,
                last_name: lastName,
                website_url: websiteUrl,
                bio,
            },
            {
                headers: {
                    Authorization: token,
                },
                params: {
                    _method: 'PATCH',
                },
            },
        );

        return res.data;
    } catch (err) {
        return { errCode: err.response.status };
    }
};

export default update;

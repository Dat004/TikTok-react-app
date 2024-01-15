import * as CallPath from '../utils/httpRequest';

const uploadVideo = async (des, file, thumbnail_time = 0, music = '', view_mode = '', data, token) => {
    try {
        const response = await CallPath.post(
            '/videos',
            {
                description: des,
                upload_file: file,
                thumbnail_time: thumbnail_time,
                music: music,
                viewable: view_mode,
            },
            {
                params: {},
                headers: {
                    Authorization: token,
                },
            },
        );

        return response.data;
    } catch (err) {
        return { errCode: err.response.status };
    }
};

export default uploadVideo;

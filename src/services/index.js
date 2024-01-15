import login from './authLogin';
import logout from './authLogout';
import search from './searchService';
import videos from './listVideoService';
import suggest from './accountSuggestService';
import user from './getUser';
import following from './accountsFollowing';
import update from './UpdateUserCurrent';
import getAVideo from './GetAVideo';
import { followUser, unFollowUser } from './follow';
import comment from './comments';
import uploadVideo from './uploadVideo';
import Base64Convert from './convertBase64ToBlob';
import postComments from './postComments';
import { likeVideo, unLikeVideo } from './likeVideo';
import { likeComment, unLikeComment } from './likeComment';
import { deleteVideo, deleteComment } from './delete';
import updateComments from './updateComments';

const config = {
    login,
    logout,
    search,
    videos,
    suggest,
    user,
    following,
    update,
    followUser,
    unFollowUser,
    getAVideo,
    comment,
    Base64Convert,
    uploadVideo,
    postComments,
    likeVideo,
    unLikeVideo,
    likeComment,
    unLikeComment,
    deleteVideo,
    deleteComment,
    updateComments,
};

export default config;

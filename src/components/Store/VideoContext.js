import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const VideoContext = React.createContext();

export function UserVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({ children }) {
    const [idVideo, setIdVideo] = useState();
    const [listVideos, setListVideos] = useState([]);
    const [listVideoHome, setListVideoHome] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [positionVideo, setPositionVideo] = useState(null);
    const [valueVolume, setValueVolume] = useState(0);
    const [mutedVideo, setMutedVideo] = useState(true);
    const [likeVideo, setLikeVideo] = useState(false);
    const [likesCount, setLikesCount] = useState(false);
    const [followUser, setFollowUser] = useState(false);

    const value = {
        listVideos,
        setListVideos,
        listVideoHome,
        setListVideoHome,
        positionVideo,
        setPositionVideo,
        idVideo,
        setIdVideo,
        mutedVideo,
        setMutedVideo,
        valueVolume,
        setValueVolume,
        likeVideo,
        setLikeVideo,
        likesCount,
        setLikesCount,
        followUser,
        setFollowUser,
        profileUser,
        setProfileUser,
    };

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
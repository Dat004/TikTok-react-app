import React, { useState, useRef, useContext } from 'react';

const VideoContext = React.createContext();

export function UserVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({ children }) {
    const [listVideos, setListVideos] = useState([]);
    const [listVideoHome, setListVideoHome] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [positionVideo, setPositionVideo] = useState(null);
    const [idVideo, setIdVideo] = useState();
    const [mutedVideo, setMutedVideo] = useState(true);
    const [valueVolume, setValueVolume] = useState(0);
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

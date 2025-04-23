const { default: axios } = require("axios");

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const getVideos = async (query) => {
    const params = {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 2,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    };

    const res = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });

    return res.data.items;
};
// Service to extract YouTube video ID
const getYoutubeVideoId = (videoUrl) => {
  try {
    const url = new URL(videoUrl);

    // Standard YouTube URL: ?v=VIDEO_ID
    const videoId = url.searchParams.get("v");
    if (videoId) return videoId;

    // Shortened youtu.be URL
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/")[1];
    }

    // Embed or shorts URL
    if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/")[2];
    }

    // Regex fallback
    const match = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
    if (match) return match[1];

    return null;
  } catch (error) {
    return null;
  }
};

module.exports = { getYoutubeVideoId };

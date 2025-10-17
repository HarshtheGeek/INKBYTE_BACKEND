const { summarizeSubtitles } = require("../services/YoutubeVideoServices");
const { getYoutubeVideoId } = require("../services/VideoIdServices");
const { getTranscript } = require("../services/YoutubeTranscriptionService");

const summarizeController = async (req, res) => {
  try {
    const { VideoUrl } = req.body;

    // Validate request body
    if (!VideoUrl) {
      return res.status(400).json({
        message: "VideoUrl is required. Please try again.",
        success: false,
      });
    }

    // Extract YouTube video ID
    const VideoId = getYoutubeVideoId(VideoUrl);
    if (!VideoId) {
      return res.status(400).json({
        message: "Cannot fetch video ID. Please try again later.",
        success: false,
      });
    }

    console.log(`Fetching transcript for video ID: ${VideoId}`);

    // Fetch transcript
    let transcript = await getTranscript(VideoId);
    transcript = transcript?.trim();
    
    if (!transcript) {
      return res.status(400).json({
        message: "Cannot fetch transcription. The video might not have captions available.",
        success: false,
        videoId: VideoId
      });
    }

    console.log(`Transcript length: ${transcript.length} characters`);

    // Summarize transcript
    const summary = await summarizeSubtitles(transcript);

    return res.status(200).json({
      message: "Summary fetched successfully",
      success: true,
      videoId: VideoId,
      summary,
    });
  } catch (error) {
    console.error("SummarizeController Error:", error.message);

    return res.status(500).json({
      message: "An error occurred while summarizing subtitles.",
      error: error.message,
      success: false,
    });
  }
};

module.exports = { summarizeController };
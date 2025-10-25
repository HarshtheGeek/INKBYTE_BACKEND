const { summarizeSubtitles } = require("../services/YoutubeVideoServices");
const { getYoutubeVideoId } = require("../services/VideoIdServices");
const { getTranscript } = require("../services/YoutubeTranscriptionService");
const redis = require('../config/redis');


const summarizeController = async (req, res) => {
  try {
    const { VideoUrl } = req.body;

    // Validate request body - Jo bhi youtube url user ke paas se aa raha hai woh hum nikal lenge
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

    //Redis summary extraction from the video id
    const CachedData = await redis.get(VideoId);
    if(CachedData){
      console.log("Cached data exists and has been fetched successfully!");
      return res.status(200).json({
        success : true , 
        videoId : VideoId,
        summary : CachedData,
      })
    }

    console.log(`Fetching transcript for video ID: ${VideoId}`)

    // Fetch transcript - Using the transcription api
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

    await redis.set(VideoId,summary,{ex : 86400});

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
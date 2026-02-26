const Comment = require('../models/Comment'); // Apna model path check karlein

// GET Comments
exports.getComments = async (req, res) => {
  try {
    const { mcqId } = req.params;
    const comments = await Comment.find({ mcqId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ADD Comment
exports.addComment = async (req, res) => {
  try {
    const { mcqId, userName, commentText } = req.body;

    // Validation
    if (!mcqId || !commentText) {
      return res.status(400).json({ success: false, message: "Missing mcqId or commentText" });
    }

    const newComment = new Comment({
      mcqId,
      userName: userName || "Anonymous",
      commentText
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      data: newComment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
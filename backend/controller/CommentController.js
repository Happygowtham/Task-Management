const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
    try {
        const data = await Comment.find({ commentTo: req.params.taskId })
            .populate('commentBy', 'name')
            .then(function (response) {
                return res.status(200).json({
                    statuscode: 200,
                    status: "success",
                    data: response,
                    error: [{ message: "", errorcode: "" }],
                });
            });
    } catch (err) {
        res.status(500).json({
            statuscode: 500,
            status: "failed",
            data: {},
            error: [{ message: err.message, errorcode: 500 }],
        });
    }
};

exports.addComment = async (req, res) => {
    try {
        const data = await Comment.create(req.body)
            .then(function (response) {
                return res.status(200).json({
                    statuscode: 200,
                    status: "success",
                    data: response,
                    error: [{ message: "", errorcode: "" }],
                });
            });
    } catch (err) {
        res.status(500).json({
            statuscode: 500,
            status: "failed",
            data: {},
            error: [{ message: err.message, errorcode: 500 }],
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const data = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(function (response) {
                return res.status(200).json({
                    statuscode: 200,
                    status: "success",
                    data: response,
                    error: [{ message: "", errorcode: "" }],
                });
            });
    } catch (err) {
        res.status(500).json({
            statuscode: 500,
            status: "failed",
            data: {},
            error: [{ message: err.message, errorcode: 500 }],
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const data = await Comment.findByIdAndDelete(req.params.id)
            .then(function (response) {
                return res.status(200).json({
                    statuscode: 200,
                    status: "success",
                    data: response,
                    error: [{ message: "", errorcode: "" }],
                });
            });
    } catch (err) {
        res.status(500).json({
            statuscode: 500,
            status: "failed",
            data: {},
            error: [{ message: err.message, errorcode: 500 }],
        });
    }
};
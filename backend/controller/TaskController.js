const Task = require('../models/Task');

exports.getMyTasks = async (req, res) => {
    try {
        const data = await Task.find()
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

exports.getAssignedTasks = async (req, res) => {
    try {
        const data = await Task.find()
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

exports.addTasks = async (req, res) => {
    try {
        const data = await Task.create(req.body)
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

exports.updateTasks = async (req, res) => {
    try {
        const data = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

exports.deleteTasks = async (req, res) => {
    try {
        const data = await Task.findByIdAndDelete(req.params.id)
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
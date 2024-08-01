const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
    try {
        const data = await Project.find()
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

exports.addProject = async (req, res) => {
    try {
        const data = await Project.create(req.body)
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

exports.updateProject = async (req, res) => {
    try {
        const data = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

exports.deleteProject = async (req, res) => {
    try {
        const data = await Project.findByIdAndDelete(req.params.id)
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
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Modal, Rating, Select, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { sendEmail } from "../../../helper/SendEmail";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskForm = ({ data, show, onClose, user, type }) => {
    const intialValue = {
        projectId: "",
        title: "",
        description: "",
        status: "",
        priority: "",
        assignedTo: "",
        dueDate: "",
    }


    const [formData, setFormData] = useState({ ...intialValue, status: "pending", priority: "1", })
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })
    const [errors, setErrors] = useState(intialValue);
    const [projectData, setProjectData] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {
        data !== "" && setFormData({ ...data, dueDate: data?.dueDate?.split("T")?.[0] })
        getProjectData()
        getUserData()
        // eslint-disable-next-line
    }, [])

    const getProjectData = () => {
        axiosInstance('project/getProjects/', {
            method: 'GET',
        }).then(res => {
            setProjectData(res?.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getUserData = () => {
        axiosInstance('user/getUsers/', {
            method: 'GET',
        }).then(res => {
            setUserData(res?.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validate = (fieldValues = formData) => {
        let temp = { ...errors };

        if ("projectId" in fieldValues) temp.projectId = fieldValues.projectId === "" ? "Project is required" : '';
        if ("title" in fieldValues) temp.title = fieldValues?.title === "" ? "Title is required" : "";
        if ("dueDate" in fieldValues) temp.dueDate = fieldValues?.dueDate === "" ? "Due Date is required" : "";
        if ("assignedTo" in fieldValues) temp.assignedTo = fieldValues?.assignedTo === "" ? "Assignee is required" : "";

        setErrors({ ...temp });

        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = () => {
        if (validate()) {
            let url = data !== "" ? `task/updateTask/${formData?._id}` : "task/addTask/"
            let method = data !== "" ? "PUT" : "POST"
            axiosInstance(url, {
                method: method,
                data: {
                    assignedTo: formData?.assignedTo,
                    description: formData?.description,
                    dueDate: formData?.dueDate,
                    files: [],
                    priority: formData?.priority,
                    projectId: formData?.projectId,
                    status: formData?.status,
                    title: formData?.title,
                    createdBy: data === "" ? user?._id : data?.createdBy,
                }
            }).then(res => {
                onClose()
                data === "" ?
                    sendEmail({
                        to: formData?.assignedTo,
                        subject: "Task Assigned",
                        content: `${user?.name} has assigned you a new task titled - ${formData?.title}`
                    })
                    : sendEmail({
                        to: user?._id,
                        subject: "Task Status Updated",
                        content: `${user?.name} has updated the task titled - ${formData?.title}`
                    })
            }).catch(err => {
                setAlert({ show: true, message: err?.error?.[0]?.message, type: "error" })
            })
        }
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={alert?.show}
                autoHideDuration={3000}
            >
                <Alert onClose={() => { setAlert({ show: false, message: "", type: "" }) }} severity={alert?.type}>{alert?.message}</Alert>
            </Snackbar>
            <Modal
                open={show}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6">Task Form</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="projectId-label" size="small">Project Id</InputLabel>
                        <Select
                            labelId="projectId-label"
                            id="projectId"
                            value={formData?.projectId || ""}
                            label="Project Id"
                            onChange={handleChange}
                            size="small"
                            name="projectId"
                            disabled={type === "my"}
                        >
                            {
                                projectData?.map(res => {
                                    return (
                                        <MenuItem value={res?._id}>{res?.title}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Typography variant="body1" color={"error"}>{errors?.projectId}</Typography>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        name="title"
                        value={formData?.title}
                        onChange={handleChange}
                        disabled={type === "my"}
                    />
                    <Typography variant="body1" color={"error"}>{errors?.title}</Typography>
                    <TextField
                        fullWidth
                        label="Due Date"
                        type="date"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        name="dueDate"
                        value={formData?.dueDate}
                        onChange={handleChange}
                        disabled={type === "my"}
                    />
                    <Typography variant="body1" color={"error"}>{errors?.dueDate}</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="assignedTo-label" size="small">Assigned To</InputLabel>
                        <Select
                            labelId="assignedTo-label"
                            id="assignedTo"
                            value={formData?.assignedTo || ""}
                            label="Assigned To"
                            onChange={handleChange}
                            size="small"
                            name="assignedTo"
                            disabled={type === "my"}
                        >
                            {
                                userData?.map(res => {
                                    return (
                                        <MenuItem value={res?._id}>{res?.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Typography variant="body1" color={"error"}>{errors?.assignedTo}</Typography>
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        name="description"
                        value={formData?.description}
                        onChange={handleChange}
                        disabled={type === "my"}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData?.status || ""}
                            label="Status"
                            onChange={handleChange}
                            size="small"
                            name="status"
                        >
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"in-progress"}>In Progress</MenuItem>
                            <MenuItem value={"completed"}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography sx={{ mt: 2 }}>Priority</Typography>
                    <Rating
                        name="priority"
                        value={formData?.priority || 0}
                        onChange={handleChange}
                        max={3}
                        disabled={type === "my"}
                    />
                    <Box display="flex">
                        <Button sx={{ m: 2 }} variant="contained" color="error" onClick={onClose} fullWidth>Cancel</Button>
                        <Button sx={{ m: 2 }} variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default TaskForm
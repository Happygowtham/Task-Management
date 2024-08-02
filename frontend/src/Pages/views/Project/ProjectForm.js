import { Alert, Box, Button, Modal, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";

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

const ProjectForm = ({ data, show, onClose }) => {

    const intialValue = {
        title: "",
        description: "",
        dueDate: "",
    }

    const [formData, setFormData] = useState(intialValue)
    const [alert, setAlert] = useState({ show: false, message: "", type: "" })
    const [errors, setErrors] = useState(intialValue);

    useEffect(() => {
        data !== "" && setFormData({ ...data, dueDate: data?.dueDate?.split("T")?.[0] })
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validate = (fieldValues = formData) => {
        let temp = { ...errors };

        if ("title" in fieldValues) temp.title = fieldValues?.title === "" ? "Title is required" : "";
        if ("dueDate" in fieldValues) temp.dueDate = fieldValues?.dueDate === "" ? "Due Date is required" : "";

        setErrors({ ...temp });

        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = () => {
        if (validate()) {
            let url = data !== "" ? `project/updateProject/${formData?._id}` : "project/addProject/"
            let method = data !== "" ? "PUT" : "POST"
            axiosInstance(url, {
                method: method,
                data: {
                    description: formData?.description,
                    dueDate: formData?.dueDate,
                    title: formData?.title,
                }
            }).then(res => {
                onClose()
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
                    <form>
                        <Typography variant="h6">Project Form</Typography>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            name="title"
                            value={formData?.title}
                            onChange={handleChange}
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
                        />
                        <Typography variant="body1" color={"error"}>{errors?.dueDate}</Typography>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            name="description"
                            value={formData?.description}
                            onChange={handleChange}
                        />

                        <Box display="flex">
                            <Button sx={{ m: 2 }} variant="contained" color="error" onClick={onClose} fullWidth>Cancel</Button>
                            <Button sx={{ m: 2 }} variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default ProjectForm
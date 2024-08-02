import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
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


const UserForm = ({ data, show, onClose }) => {

    const intialValue = {
        name: "",
        role: "",
    }
    const [formData, setFormData] = useState(intialValue)
    const [errors, setErrors] = useState(intialValue);

    useEffect(() => {
        data !== "" && setFormData(data)
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validate = (fieldValues = formData) => {
        let temp = { ...errors };
        if ("name" in fieldValues) temp.name = fieldValues?.name === "" ? "Name is required" : "";
        setErrors({ ...temp });

        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = () => {
        if (validate()) {
            let url = `user/updateUser/${formData?._id}`
            let method = "PUT"
            axiosInstance(url, {
                method: method,
                data: {
                    name: formData?.name,
                    role: formData?.role,
                }
            }).then(res => {
                onClose()
            })
        }
    }

    return (
        <>
            <Modal
                open={show}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form>
                        <Typography variant="h6">User Form</Typography>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            name="name"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                        <Typography variant="body1" color={"error"}>{errors?.name}</Typography>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData?.role || ""}
                                label="Role"
                                onChange={handleChange}
                                size="small"
                                name="role"
                            >
                                <MenuItem value={"user"}>User</MenuItem>
                                <MenuItem value={"admin"}>Admin</MenuItem>
                            </Select>
                        </FormControl>
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

export default UserForm
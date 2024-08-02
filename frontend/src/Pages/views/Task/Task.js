import { useEffect, useState } from "react"
import Base from "../../../Layout/Base"
import axiosInstance from "../../../axiosInstance"
import { Box, Button, Card, CardContent, Grid, IconButton, Rating, Typography } from "@mui/material";
import TaskForm from "./TaskForm";
import DeleteIcon from '@mui/icons-material/Delete';

const Task = () => {

    const [data, setData] = useState([]);
    const [modal, setModal] = useState({ show: false, data: "" });

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axiosInstance('/task/getTasks/', {
            method: 'GET',
        }).then(res => {
            setData(res?.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleMoalClose = () => {
        setModal({ show: false, data: "" })
        getData()
    }

    const handleDelete = (e, id) => {
        e?.stopPropagation()
        axiosInstance(`/task/deleteTask/${id}`, {
            method: 'DELETE',
        }).then(res => {
            getData()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Base>
            {
                modal?.show && (
                    <TaskForm show={modal?.show} data={modal?.data} onClose={handleMoalClose} />
                )
            }
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant='h5' sx={{ mb: 2 }}>Tasks</Typography>
                <Button variant="contained" color="primary" size="small" onClick={() => setModal({ show: true, data: "" })}>Add Task</Button>
            </Box>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ cursor: "pointer" }} variant="outlined" onClick={() => setModal({ show: true, data: item })}>
                            <CardContent>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <IconButton onClick={(e) => handleDelete(e, item?._id)}><DeleteIcon fontSize="small" /></IconButton>
                                </Box>
                                <Rating
                                    name="simple-controlled"
                                    value={item?.priority || 0}
                                    size="small"
                                    max={3}
                                />
                                <Typography variant="body2">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Base>
    )
}

export default Task
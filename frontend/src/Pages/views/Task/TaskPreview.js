import { Avatar, Box, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import axiosInstance from "../../../axiosInstance";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
};

const TaskPreview = ({ data, show, onClose }) => {

    const user = JSON.parse(localStorage?.getItem("task_management_user"));
    const [comment, setComment] = useState({ data: "" })
    const [commentData, setCommentData] = useState([])

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const getData = () => {
        axiosInstance(`/comment/getComments/${data?._id}`, {
            method: 'GET',
        }).then(res => {
            setCommentData(res?.data)
        })
    }

    const handleSubmit = () => {
        let url = comment?.id ? `comment/updateComment/${comment?.id}` : "comment/addComment/"
        let method = comment?.id ? `PUT` : "POST"
        axiosInstance(url, {
            method: method,
            data: {
                comment: comment?.data,
                commentTo: data._id,
                commentBy: user?._id
            }
        }).then(res => {
            setComment({ data: "" })
            getData();
        })
    }

    const handleDelete = (e, id) => {
        e?.stopPropagation()
        axiosInstance(`/comment/deleteComment/${id}`, {
            method: 'DELETE',
        }).then(res => {
            getData();
        })
    }

    const handleUpdate = (e, comment, id) => {
        e?.stopPropagation()
        setComment({ data: comment, id: id })
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                        <Box>
                            <Typography variant='h5'>{data.title}</Typography>
                            <Typography variant='body1'>&emsp;{data.description}</Typography>
                        </Box>
                        <IconButton onClick={onClose} sx={{ padding: "3px" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ m: 2 }}>
                        <Typography variant='h6'>Comments</Typography>
                        {commentData && commentData?.map((comment) => {
                            return (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <Box sx={{ display: 'flex', margin: '10px 0', width: "90%" }}>
                                        <Avatar alt="Remy Sharp" />
                                        <Box sx={{ ml: 2 }}>
                                            <Typography variant='body1' fontWeight={"bold"}>{user?._id === comment?.commentBy?._id ? "You" : comment.commentBy.name} commented on {comment?.updatedAt?.split("T")?.[0]}</Typography>
                                            <Typography variant='body2'>{comment.comment}</Typography>
                                        </Box>
                                    </Box>
                                    {
                                        user?._id === comment?.commentBy?._id &&
                                        <Box sx={{ mt: 1 }}>
                                            <IconButton onClick={(e) => handleUpdate(e, comment?.comment, comment?._id)} sx={{ padding: "3px" }}>
                                                <BorderColorIcon color="info" fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={(e) => handleDelete(e, comment?._id)} sx={{ padding: "3px" }}>
                                                <DeleteIcon color="error" fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    }
                                </Box>
                            )
                        })}
                    </Box>
                    <Box sx={{ width: '100%', pl: 2 }}>
                        <TextField
                            label='Add Comment'
                            onChange={(e) => setComment({ ...comment, data: e?.target?.value })}
                            value={comment?.data}
                            variant='outlined'
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton disabled={comment?.data === ""} onClick={handleSubmit} edge='end'>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default TaskPreview
import { Box, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import axiosInstance from "../../../axiosInstance";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const TaskPreview = ({ data, show, onClose }) => {

    const user = JSON.parse(localStorage?.getItem("task_management_user"));
    const [comment, setComment] = useState("")
    const [commentData, setCommentData] = useState([])
    console.log('commentData: ', commentData);

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axiosInstance(`/comment/getComments/${data?._id}`, {
            method: 'GET',
        }).then(res => {
            setCommentData(res?.data)
        })
    }

    const handleSubmit = () => {
        axiosInstance('/comment/addComment/', {
            method: 'POST',
            data: {
                comment: comment,
                commentTo: data._id,
                commentBy: user?._id
            }
        }).then(res => {
            console.log('res: ', res);
        })
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
                    <Box>
                        <Typography variant='h5'>{data.title}</Typography>
                        <Typography variant='body1'>&emsp;{data.description}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', p: 2 }}>
                        <Typography variant='h6'>Comments</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {commentData && commentData?.map((comment) => (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                    <Typography variant='body1'>{comment.commentBy.name}</Typography>
                                    <Typography variant='body2'>{comment.comment}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', pl: 2 }}>
                        <TextField
                            label='Add Comment'
                            onChange={(e) => setComment(e?.target?.value)}
                            value={comment}
                            variant='outlined'
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton disabled={comment === ""} onClick={handleSubmit} edge='end'>
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
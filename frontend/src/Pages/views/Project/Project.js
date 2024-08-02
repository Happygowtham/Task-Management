import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Base from '../../../Layout/Base';
import { Box, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import ProjectForm from './ProjectForm';


const Project = () => {

    const [data, setData] = useState([])
    const [modal, setModal] = useState({ show: false, data: "" });

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axiosInstance('/project/getProjects/', {
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
        axiosInstance(`/project/deleteProject/${id}`, {
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
                    <ProjectForm show={modal?.show} data={modal?.data} onClose={handleMoalClose} />
                )
            }
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant='h5' sx={{ mb: 2 }}>Projects</Typography>
                <Button variant="contained" color="primary" size="small" onClick={() => setModal({ show: true, data: "" })}>Add Project</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>S No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.length > 0 ? data?.map((row, id) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center'>{id + 1}</TableCell>
                                <TableCell>{row?.title}</TableCell>
                                <TableCell>{row.dueDate && row?.dueDate?.split("T")?.[0]}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={(e) => handleDelete(e, row?._id)}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                    <IconButton onClick={() => setModal({ show: true, data: row })}>
                                        <BorderColorIcon color='info' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                            : <Typography variant='h6'>No Data Available</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Base >
    );
}

export default Project
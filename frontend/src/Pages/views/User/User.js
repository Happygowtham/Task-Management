import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Base from '../../../Layout/Base';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import UserForm from './UserForm';

const User = () => {

    const [data, setData] = useState([])
    const [modal, setModal] = useState({ show: false, data: "" });

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axiosInstance('/user/getUsers/', {
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
        axiosInstance(`/user/deleteUser/${id}`, {
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
                    <UserForm show={modal?.show} data={modal?.data} onClose={handleMoalClose} />
                )
            }
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant='h5' sx={{ mb: 2 }}>Users</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>S No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
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
                                <TableCell>{row?.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={(e) => handleDelete(e, row?._id)}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                    <IconButton onClick={() => setModal({ show: true, data: row })}>
                                        <BorderColorIcon color='info' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )) : <Typography variant='h6'>No Data Available</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Base >
    )
}

export default User
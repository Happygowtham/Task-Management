import { useEffect, useState } from "react"
import Base from "../../Layout/Base"
import axiosInstance from "../../axiosInstance"


const Task = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axiosInstance('/task/getTasks/', {
            method: 'GET',
        }).then(res => {
            setData(res?.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Base>
            Task Page
        </Base>
    )
}

export default Task
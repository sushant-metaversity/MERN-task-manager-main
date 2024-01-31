import React, { useEffect } from 'react'
import "./Dashboard.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ClientEvents, ServerEvents } from "../../events"
import {removeTask, setTask} from "../../APIStore/Features/auth/taskSlice"
import moment from 'moment'
import toast from 'react-hot-toast'
import { socket } from '../Socket/socket'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tasks = useSelector((state)=>state.task.tasks)
    const handleadd = () => {
        navigate("/NewTask")
    }


    useEffect(() => {
        socket?.on("connected",()=>console.log("hi"))
          
        socket?.on(ServerEvents.TASK_REMOVED, (args) => {
             dispatch(removeTask(args))
             toast.success("Task Removed")
        })
        return () => {
          socket?.off(ServerEvents.TASK_REMOVED)
      }
    }, [socket])

    const handleDelete = (id) => {
        socket?.emit(ClientEvents.TASK_DELETE,id)
    }

    return (
        <div className='main-page'>

            <button className='addtask-btn' onClick={handleadd}>Add new task</button>
            <div className='main-container'>
                <div className='table-container'>
                    <table>
                        <tr>
                            <th>S no.</th>
                            <th>Date</th>
                            <th>View</th>
                            {/* <th>category</th> */}
                            <th>prioritize</th>
                            <th>Edit</th>
                            <th>Option</th>

                        </tr>
                       
                        {tasks.map((i,id) => <tr>
                            <td>{id+1}</td>
                            <td>{moment(i.createdAt).format("DD-MM-YYYY")}</td>
                            <td onClick={()=>navigate("/UpdateTask/"+i._id+"/?view-only=true")} >View</td>
                            <td>{i.priority}</td>
                            <td onClick={() => navigate("/UpdateTask/"+i._id)}>Edit</td>
                            <td onClick={()=>handleDelete(i._id)}>Delete</td>
                        </tr>)}
                        {!(tasks?.length>0)&& <tr>
                           
                            <td colSpan={6} style={{textAlign:"center"}} align='center'>No Task Found</td>
                        </tr>}
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Dashboard
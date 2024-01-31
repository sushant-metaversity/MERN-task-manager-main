import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import "./NewTask.css"
import { ClientEvents, ServerEvents } from '../../events'
import { useDispatch, useSelector } from 'react-redux'
import { appendTask } from '../../APIStore/Features/auth/taskSlice'
import toast from 'react-hot-toast'
import { socket } from '../Socket/socket'

const NewTask = () => {

    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const viewOnly = !!searchParams.get("view-only")
    const task = useSelector(state => state.task.tasks.find(i=>i._id===id))
    const navigate = useNavigate()
    const [newTask, setNewTask] = useState(task?.description||"")
    const [priority, setpriority] = useState(task?.priority||"")

    const dispatch = useDispatch()
    const handleInput = (e) => {
        let input = e.target.value
        setNewTask(input)
    }

    const handleSave = () => {
        socket.emit(ClientEvents.TASK_CREATE,{description:newTask,priority})
    }
    const handleUpdate = () => {
        socket.emit(ClientEvents.TASK_UPDATE,{taskId:task._id,description:newTask,priority})

    }

    const handleBack = () => {
        navigate("/add-list")

    }
    const handlepriority = (e) => {
        let inputValue = e.target.value;
        setpriority(inputValue)
    }
    useEffect(() => {
      
setNewTask(task?.description||"")
setpriority(task?.priority||"")
      return () => {
        
      }
    }, [task])
    
    useEffect(() => {
        socket.on(ServerEvents.TASK_ADDED, (args) => {
            if (args?._id) {
                dispatch(appendTask(args))
                setpriority("")
                setNewTask("")
                toast.success("Task Created")
          }
        })
         socket.on(ServerEvents.TASK_UPDATED, (args) => {
            if (args?.status) {
                dispatch(appendTask(args.task))
                toast.success(args.message)
          }
      })
        return () => {
          socket.off(ServerEvents.TASK_ADDED)
          socket.off(ServerEvents.TASK_UPDATED)
      }
    }, [socket])
    return (
        <div className='main-container-add-task'>
            <div className='add-task'>

                {id && !task ? <span className='header-tag'>Task Not Found</span> :<>
                    <span className='header-tag'>{viewOnly? "View ":id ? "Update " : "Add "} Task</span>

                <textarea readOnly={viewOnly} value={newTask} onChange={handleInput} className='Disp-box' />

                    <select
                    aria-readonly={viewOnly}
                    className="box_selection"
                    value={priority}
                    onChange={handlepriority}
                    >
                    <option value="">Select Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                </select>
                    <div className='btn-container'>
                        {
                          !viewOnly&&  <>
                    { !id && <button onClick={handleSave} className='task-save'>
                        Save Task
                    </button>}
                    {id && <button onClick={handleUpdate} className='task-save'>
                        Update
                    </button>}
                            </>
                        }
                    <button onClick={handleBack} className='back-btnn'>
                        Back to home
                    </button>
                    </div>
                    </>
                }
            </div>
        </div>


    )
}

export default NewTask
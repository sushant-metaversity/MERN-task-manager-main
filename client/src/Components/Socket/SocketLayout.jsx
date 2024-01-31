import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ServerEvents } from '../../events'
import { appendTask, setTask } from '../../APIStore/Features/auth/taskSlice'
import { useDispatch } from 'react-redux'
import { socket } from './socket'

const SocketLayout = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        socket.on(ServerEvents.TASKS, (args) => {
            if (args?.status) {
                dispatch(setTask(args.tasks))
            }
        })
        socket.on(ServerEvents.TASK_ADDED, (args) => {
            if (args?._id) {
                dispatch(appendTask(args))
            }
        })
        socket.on(ServerEvents.TASK_UPDATED, (args) => {
            if (args?.status) {
                dispatch(appendTask(args.task))
            }
        })

        return () => {
          socket.off(ServerEvents.TASKS)
          socket.off(ServerEvents.TASK_ADDED)
          socket.off(ServerEvents.TASK_UPDATED)
      }
    }, [socket])
  return (
    <div><Outlet/></div>
  )
}

export default SocketLayout
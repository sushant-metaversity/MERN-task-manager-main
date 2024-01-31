import { createSlice } from '@reduxjs/toolkit'
import {
    postLogin, postSignUp

} from './authActions'

const INITAL_STATE = {
   tasks:[]
}

const taskSlice = createSlice({
    name: "task",
    initialState: INITAL_STATE,
    reducers: {
        setTask: (state,action) => {
            state.tasks = action.payload
        },
        appendTask: (state, action) => {
          state.tasks= [...state.tasks.filter(i=>i._id!==action.payload._id),action.payload].sort((a,b)=>a.priority-b.priority)  
        },
        removeTask: (state, action) => {
            console.log(action.payload);
            state.tasks=state.tasks.filter(i=>i._id!==action.payload)
        }
    },
});

export const { setTask,appendTask,removeTask } = taskSlice.actions;
export default taskSlice.reducer
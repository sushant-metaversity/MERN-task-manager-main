import {configureStore,} from '@reduxjs/toolkit'
import authSlice from '../Features/auth/authSlice'
import taskSlice from '../Features/auth/taskSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        task:taskSlice,
    },

    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({
        serializableCheck: false
    })
})

export default store
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import QuestionStructureSlice from "@/app/redux/Slices/QuestionStructureSlice";
const RootReducers = combineReducers({
    QuestionStructure: QuestionStructureSlice,
})

export const store = configureStore({
    reducer: RootReducers
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
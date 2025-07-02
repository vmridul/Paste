import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") 
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addtoPaste: (state,action) => {
        const paste = action.payload;

        if(!paste.title){
            toast.error("Add Some Title!!")
        }
        else if(state.pastes.some(p => p.title === paste.title)){ // read theory of ts bs
            toast.error("Paste with this title already exists!!")
        }else{
            state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully");
        }
                    
    },
    updatetoPaste: (state,action) => {
        const paste = action.payload;
        const index = state.pastes.findIndex((item) => item._id === paste._id);
        if(index >= 0){
            state.pastes[index] = paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste Updated");
        }
    },
    resetallPastes: (state, action) => {
        state.pastes = [];
        localStorage.removeItem("pastes");
    },
    removefromPastes: (state,action) => {
        const pasteId = action.payload;
        const index = state.pastes.findIndex((item) => item._id === pasteId);
        
        if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste Deleted");
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoPaste, updatetoPaste, resetallPastes,removefromPastes } = pasteSlice.actions

export default pasteSlice.reducer
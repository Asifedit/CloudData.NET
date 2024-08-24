import { createSlice } from "@reduxjs/toolkit";


const loginded = () => {
    if (!localStorage.getItem("Acessestoken")) {
        return false;
    } else {
        return true;
    }
};


const smallReduser = createSlice({
    name: "Tools",
    initialState: {
        manue: false,
        LOGINDED: loginded(),
        userDATA: [],
    },
    reducers: {
        clickonmanu: (state, action) => {
            state.manue = action.payload;
        },
        changisUserLogin: (state, action) => {
            state.LOGINDED = action.payload;
        },
        addDataonStore: (state, action) => {
            state.userDATA = action.payload;
        },
    },
});

export const { clickonmanu, changisUserLogin, addDataonStore,  } =
    smallReduser.actions; // Correct action name
export default smallReduser.reducer;

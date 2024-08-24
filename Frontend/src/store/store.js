import { configureStore } from "@reduxjs/toolkit";
import smallReduser from "./smallReduser";
export const store = configureStore({
    reducer: {
        tools:smallReduser,
    },
});

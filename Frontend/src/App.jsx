import React, { useEffect } from "react";
import NAVBAR from "./components/others/nav";
import { Toaster } from "react-hot-toast";
import UserRoute from "./router/route";
import NavManu from "./components/view/NavDasnord"

function App() {
    return (
        <>
            <NAVBAR />
            <NavManu />
            <Toaster
                position='bottom-right'
                gutter={8}
                toastOptions={{
                    duration: 2000,
                }}
            />

            <UserRoute />
        </>
    );
}
export default App;

import { Daytripper } from "./components/Daytripper"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Daytripper/>
    </BrowserRouter>
)


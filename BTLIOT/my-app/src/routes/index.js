import Dust from "../component/Dust";
import Home from "../component/Home";
import Orders from "../component/Orders";
import Sun from "../component/Sun";
import Temperature from "../component/Temperature";

const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
];
export default routes;
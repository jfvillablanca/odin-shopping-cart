import App from "./routes/App";
import Home from "./routes/Home";
import Shop from "./routes/Shop";

export default function createRouterConfig() {
    return [
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "/home",
                    element: <Home />,
                },
                {
                    path: "/shop",
                    element: <Shop />,
                },
            ],
        },
    ];
}

import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import RoundRobin from "./pages/RoundRobin";
import PageNotFound from "./pages/PageNotFound";
import RedirectMainPage from "./pages/RedirectMainPage";
import Ranking from "./pages/Ranking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <RedirectMainPage /> },
      { path: "ranking", element: <Ranking /> },
      { path: "round-robin", element: <RoundRobin /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

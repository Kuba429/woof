import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeView } from "./views/home/HomeView";
import { SearchView } from "./views/search/SearchView";
import { AllView } from "./views/all/All";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeView />,
	},
	{
		path: "/search",
		element: <SearchView />,
	},
	{
		path: "/all",
		element: <AllView />,
	},
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

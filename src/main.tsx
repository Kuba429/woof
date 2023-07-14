import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeView } from "./views/home/HomeView";
import { SearchView } from "./views/search/SearchView";
import { AllView } from "./views/all/AllView";
import { BreedView } from "./views/breed/BreedView";
import { LikedView } from "./views/liked/LikedView";

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
	{
		path: "/breed/:main/:sub",
		element: <BreedView />,
	},
	{
		path: "/breed/:main",
		element: <BreedView />,
	},
	{
		path: "/liked",
		element: <LikedView />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

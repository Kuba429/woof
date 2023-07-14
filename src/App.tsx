import { useRoutes } from "react-router-dom";
import { HomeView } from "./views/home/HomeView";
import { SearchView } from "./views/search/SearchView";
import { AllView } from "./views/all/AllView";
import { BreedView } from "./views/breed/BreedView";
import { LikedView } from "./views/liked/LikedView";
import { Layout } from "./components/Layout";

export function App() {
	const element = useRoutes([
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
	return <Layout>{element}</Layout>;
}

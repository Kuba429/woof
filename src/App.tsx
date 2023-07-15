import { useRoutes } from "react-router-dom";
import { SearchView } from "./views/search/SearchView";
import { AllView } from "./views/all/AllView";
import { BreedView } from "./views/breed/BreedView";
import { LikedView } from "./views/liked/LikedView";
import { Layout } from "./components/Layout";

export function App() {
	const element = useRoutes([
		{
			path: "/",
			element: <AllView />,
		},
		{
			path: "/search",
			element: <SearchView />,
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

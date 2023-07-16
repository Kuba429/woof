import { useLocation, useRoutes } from "react-router-dom";
import { SearchView } from "./views/search/SearchView";
import { AllView } from "./views/all/AllView";
import { BreedView } from "./views/breed/BreedView";
import { LikedView } from "./views/liked/LikedView";
import { Layout } from "./components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { allBreedsAtom, fetchAllBreeds } from "./stores/breeds";

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
	const location = useLocation();
	const [, setAllBreeds] = useAtom(allBreedsAtom);
	useEffect(() => {
		async function updateAllBreeds() {
			setAllBreeds(await fetchAllBreeds());
		}
		void updateAllBreeds();
	}, [setAllBreeds]);
	return (
		<Layout>
			<AnimatePresence mode="wait">
				<motion.div
					key={location.pathname}
					initial={{ x: -500, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { duration: 0.2 },
					}}
					exit={{
						x: -500,
						opacity: 0,
						transition: { duration: 0.2 },
					}}
				>
					{element}
				</motion.div>
			</AnimatePresence>
		</Layout>
	);
}

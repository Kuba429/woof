import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";

export function AllView() {
	const breeds = useFetchAllBreeds();
	return (
		<Layout>
			{breeds.map((breed) => (
				<p>{breed}</p>
			))}
		</Layout>
	);
}

type rawBreedsType = {
	[breed: string]: string[];
};

function useFetchAllBreeds() {
	const [state, setState] = useState<string[]>([]);
	async function asyncEffect() {
		const res = await fetch("https://dog.ceo/api/breeds/list/all");
		const json = await res.json();
		const rawBreeds = json.message as rawBreedsType;
		const entries = Object.entries(rawBreeds);
		const breeds = entries.flatMap(([breed, subBreeds]) =>
			subBreeds.map((sub) => `${sub} ${breed}`)
		);
		setState(breeds);
	}
	useEffect(() => {
		asyncEffect();
	}, [setState]);
	return state;
}

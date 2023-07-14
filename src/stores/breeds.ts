import { atom } from "jotai";

async function fetchAllBreeds() {
	// const res = await fetch("https://dog.ceo/api/breeds/list/all");
	const res = await fetch("/backup.json");
	type rawBreedsType = { [breed: string]: string[] };
	const rawBreeds = (await res.json()).message as rawBreedsType;
	// konwertowanie ras do odpowiedniej formy
	const breeds = Object.entries(rawBreeds).flatMap(([main, sub]) =>
		sub.map((sub) => ({ main, sub }))
	);
	return breeds;
}
export const allBreedsAtom = atom(await fetchAllBreeds());

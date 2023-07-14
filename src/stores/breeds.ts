import { atom } from "jotai";

async function fetchAllBreeds() {
	// const res = await fetch("https://dog.ceo/api/breeds/list/all");
	const res = await fetch("/backup.json");
	type rawBreedsType = { [breed: string]: string[] };
	const rawBreeds = (await res.json()).message as rawBreedsType;
	// konwertowanie ras do odpowiedniej formy
	const breeds = Object.entries(rawBreeds).flatMap(([main, sub]) =>
		sub.map((sub) => ({
			main,
			sub,
			image: undefined as string | undefined, // zapamiętuję url do obrazu aby nie wysyłać tego samego zapytania za każdym razem bez potrzeby
			liked: false,
		}))
	);
	return breeds;
}
export const allBreedsAtom = atom(await fetchAllBreeds());
export const setImageAtom = atom(
	null,
	(get, set, update: { main: string; sub: string; newImage: string }) => {
		console.log(update.newImage);
		const copy = [...get(allBreedsAtom)];
		const itemToUpdate = copy.find(
			(item) => item.sub === update.sub && item.main === update.main
		);
		if (!itemToUpdate) {
			return;
		}
		itemToUpdate.image = update.newImage;
		set(allBreedsAtom, copy);
	}
);

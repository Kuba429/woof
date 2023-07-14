import { useAtom } from "jotai";
import { Layout } from "../../components/Layout";
import { allBreedsAtom } from "../../stores/breeds";
import { BreedList } from "../../components/BreedList";

export function LikedView() {
	const [breeds] = useAtom(allBreedsAtom);
	const likedBreeds = breeds.filter((item) => item.isLiked);
	return (
		<Layout>
			<BreedList header={"Ulubione"} items={likedBreeds} />
		</Layout>
	);
}

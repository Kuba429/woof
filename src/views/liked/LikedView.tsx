import { useAtom } from "jotai";
import { allBreedsAtom } from "../../stores/breeds";
import { BreedList } from "../../components/BreedList";

export function LikedView() {
	const [breeds] = useAtom(allBreedsAtom);
	const likedBreeds = breeds.filter((item) => item.isLiked);
	return <BreedList header={"Ulubione"} items={likedBreeds} />;
}

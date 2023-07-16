import { Link } from "react-router-dom";
import styles from "./BreedList.module.scss";
import { useAtom } from "jotai";
import { breedType, toggleLikedAtom } from "../stores/breeds";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LikeIcon } from "./LikeIcon";

export function BreedList({
	items,
	header,
	fallback = <div></div>,
}: {
	items: breedType[];
	header?: string;
	fallback?: ReactNode;
}) {
	return (
		<>
			{header && <h2>{header}</h2>}
			<AnimatePresence>
				{items.length
					? items.map((breed, idx) => (
							<ListItem
								breed={breed}
								key={`${breed.main}-${breed.sub}`}
								index={idx}
							/>
					  ))
					: fallback}
			</AnimatePresence>
		</>
	);
}

function ListItem({ breed, index }: { breed: breedType; index?: number }) {
	const [, toggleLiked] = useAtom(toggleLikedAtom);
	return (
		<motion.div
			layout
			initial={{ x: -500, opacity: 0 }}
			animate={{
				x: 0,
				opacity: 1,
				transition: { delay: 0.01 * (index ?? 0) },
			}}
			exit={{
				x: -500,
				opacity: 0,
				transition: { duration: 0.1 },
			}}
			className={styles.breed}
		>
			<Link to={`/breed/${breed.main}/${breed.sub}`}>
				{breed.sub} {breed.main}
			</Link>
			<LikeIcon
				clickCallback={() => toggleLiked(breed)}
				active={breed.isLiked}
			/>
		</motion.div>
	);
}

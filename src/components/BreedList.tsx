import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { breedType } from "../stores/breeds";
import styles from "./BreedList.module.scss";
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
			<LikeIcon breed={breed} />
		</motion.div>
	);
}

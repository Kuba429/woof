import { ReactNode } from "react";
import styles from "./Layout.module.scss";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={styles.layout}>
			{children}
			<Navbar />
		</div>
	);
}

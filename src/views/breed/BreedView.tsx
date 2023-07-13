import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";

export function BreedView() {
	const params = useParams();
	const breed = params.main + " " + (params.sub ?? "");
	return <Layout>{breed}</Layout>;
}

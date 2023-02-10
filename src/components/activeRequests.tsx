import { useEffect } from "react";
import useFetchCommunityRequests from "../customHooksAndServices/fetchCommunityRequests";

export default function ActiveRequests() {
	const { fetchRequests } = useFetchCommunityRequests();
	useEffect(() => {
		fetchRequests().then((data) => {
			console.log(data);
		});
	});
	return <div>Test</div>;
}

import { Params, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RequestDetails } from "../models/requestModels";
import useFetchRequestDetails from "../customHooksAndServices/fetchRequestDetails";

export default function RequestDetailsComponent() {
	const { id } = useParams<Params>();
	const { fetchRequestDetails } = useFetchRequestDetails();
	const [requestDetails, setRequestDetails] = useState<RequestDetails>();
	const navigate = useNavigate();

	useEffect(() => {
		if (requestDetails) {
			return;
		}
		if (!id) {
			navigate("/dashboard");
			return;
		}
		fetchRequestDetails(id).then((response) => {
			console.log(response.data.data);
			setRequestDetails(response.data.data);
		});
	});
	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Request details
				</h1>
			</div>
		</>
	);
}

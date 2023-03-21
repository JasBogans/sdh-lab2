import { PencilSVG, TrashSVG } from "@/icons";
import { useAppState } from "@/utils/AppContext";

export function Table() {
	const {
		patientsList,
		setModalOpen,
		setSelectedPatient,
		deletePatient,
	} = useAppState();

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Full name</th>
					<th>Email</th>
					<th>Address</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{patientsList?.map((patient) => (
					<tr key={patient._id}>
						<td>{patient.name}</td>
						<td>{patient.email}</td>
						<td>{patient.address}</td>
						<td>{patient.phone}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									setSelectedPatient(patient);
									setModalOpen(true);
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									deletePatient(patient._id);
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

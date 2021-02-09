import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Container, Icon, Button } from "semantic-ui-react";

import AddEntryModal from "../AddEntryModal";
import { Patient, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import BaseEntry from './BaseEntry';


const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const fetchStatus = React.useRef({ shouldFetch: false, hasFetched: false });
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [secondModalOpen, setSecondModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    let patient = patients[id];

    const openModal = (): void => setModalOpen(true);
    const openSecondModal = (): void => setSecondModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setSecondModalOpen(false);
        setError(undefined);
    };

    const closeSecondModal = (): void => {
        setSecondModalOpen(false);
        setError(undefined);
    }

    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(updatedPatient))
            closeModal()
        }
        catch (e) {
            console.error(e.response?.data);
            setError("¯\\_(ツ)_/¯");
        }
    };

    React.useEffect(() => {

        const fetchPatient = async () => {
            fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(updatePatient(patientData));
                fetchStatus.current = { ...fetchStatus.current, hasFetched: true }
            }
            catch (e) {
                console.error(e);
            }
        };


        if (fetchStatus.current.shouldFetch) {
            fetchPatient();
        }
    }, [id, dispatch]);


    const displayGenderIcon = () => {
        if (patient?.gender === "male") {
            return <Icon name="mars" size="big" />;
        }
        else if (patient?.gender === "female") {
            return <Icon name="venus" size="big" />;
        }
        else if (patient?.gender === "other") {
            return <Icon name="genderless" size="big" />;
        }
        else {
            return null;
        }
    };


    return (
        <Container>
            <h2>
                {patient?.name}
                {" "}
                {displayGenderIcon()}
            </h2>
            <p><strong>ssn:</strong> {patient?.ssn}</p>
            <p><strong>occupation:</strong> {patient?.occupation}</p>
            <h3>Entries</h3>

            {patient && patient.entries.length === 0 && (
                <p>No entries</p>
            )}

            {patient && patient.entries.length > 0 && (
                <Card.Group>
                    {patient && patient.entries.map(entry => (
                        <BaseEntry key={entry.id} entry={entry} />
                    ))}
                </Card.Group>
            )}

            <AddEntryModal
                modalOpen={modalOpen}
                secondModalOpen={secondModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
                openSecondModal={openSecondModal}
                closeSecondModal={closeSecondModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </Container>
    )
}

export default PatientPage;
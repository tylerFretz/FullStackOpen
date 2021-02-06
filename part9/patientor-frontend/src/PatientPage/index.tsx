import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import BaseEntry from './BaseEntry';


const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const fetchStatus = React.useRef({ shouldFetch: false, hasFetched: false });

    let patient = patients[id];

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
            <p>ssn: {patient?.ssn}</p>
            <p>occupation: {patient?.occupation}</p>

            {patient && patient.entries.length > 0 && <h3>Entries</h3>}

            <Card.Group>
                {patient && patient.entries.map(entry => (
                    <BaseEntry key={entry.id} entry={entry} />
                ))}
            </Card.Group>
        </Container>
    )
}

export default PatientPage;
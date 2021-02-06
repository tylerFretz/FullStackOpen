import React from "react";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";

interface DiagnosisDetailsProps {
    diagnosisCodes: Array<Diagnosis["code"]>;
};

const DiagnosisList: React.FC<DiagnosisDetailsProps> = ({ diagnosisCodes }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <List>
            <List.Item>
                <List.Header>Diagnoses</List.Header>
            </List.Item>
            {diagnosisCodes.map(code => (
                <List.Item key={code}>
                    <List.Content>
                        <List.Description>
                            <strong>{code} - </strong>
                            {diagnoses[code] && diagnoses[code].name}
                        </List.Description>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    )
}

export default DiagnosisList;
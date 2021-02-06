import React from "react";
import { Card, Icon } from "semantic-ui-react";

import { assertNever } from "../utils";
import { Entry, EntryType } from "../types";
import DiagnosisList from "./DiagnosisList";

const BaseEntry: React.FC<{ entry: Entry }> = ({ entry }) => {

    const renderHeader = () => {
        switch (entry.type) {
            case EntryType.HealthCheck:
                return <Card.Header>{entry.date} <Icon name="doctor" size="large" /></Card.Header>;
            case EntryType.OccupationalHealthCare:
                return <Card.Header>{entry.date} <Icon name="treatment" size="large" /> {entry.employerName}</Card.Header>;
            case EntryType.Hospital:
                return <Card.Header>{entry.date} <Icon name="hospital" size="large" /></Card.Header>;
            default:
                return assertNever(entry)
        }
    };

    const renderHealthRating = () => {
        if (entry.type === EntryType.HealthCheck) {
            switch (entry.healthCheckRating) {
                case 0:
                    return <Card.Content><strong>Health Rating: </strong><Icon name="heart" color="green"/></Card.Content>;
                case 1:
                    return <Card.Content><strong>Health Rating: </strong><Icon name="heart" color="yellow"/></Card.Content>;
                case 2:
                    return <Card.Content><strong>Health Rating: </strong><Icon name="heart" color="orange"/></Card.Content>;
                case 3:
                    return <Card.Content><strong>Health Rating: </strong><Icon name="heart" color="red"/></Card.Content>;
                default:
                    return null;
            }
        }
    };

    const renderDischarge = () => {
        if (entry.type === EntryType.Hospital) {
            return (
                <Card.Content>
                    <strong>Discharge: </strong> {entry.discharge.date}
                    <Card.Description>
                        {entry.discharge.criteria}
                    </Card.Description>    
                </Card.Content>
            );
        }
    };

    const renderSickLeave = () => {
        if (entry.type === EntryType.OccupationalHealthCare && entry.sickLeave) {
            return <Card.Content><strong>Sick Leave: </strong>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Card.Content>;
        }
    };


    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{renderHeader()}</Card.Header>
                <Card.Meta>{entry.specialist}</Card.Meta>
                <Card.Description>{entry.description}</Card.Description>
                    
                    {entry.diagnosisCodes && (
                        <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
                    )}
            </Card.Content>
            {renderHealthRating()}
            {renderSickLeave()}
            {renderDischarge()}
        </Card>
    )
}

export default BaseEntry;
import React from "react";
import { Card, List } from "semantic-ui-react";

import { Entry } from "../types";

const BaseEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date}</Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
                {entry.diagnosisCodes && (
                    <Card.Description>
                        <List bulleted>
                            {entry.diagnosisCodes.map(code => (
                                <List.Item>{code}</List.Item>
                            ))}
                        </List>
                    </Card.Description>
                )}
            </Card.Content>
        </Card>
    )
}

export default BaseEntry;
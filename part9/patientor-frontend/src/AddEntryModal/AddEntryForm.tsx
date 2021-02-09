import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import EntryFormExtraFields from "./EntryFormExtraFields";
import { NewEntry, EntryType } from "../types";
import { useStateValue } from "../state";

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
    entryType: EntryType;
    initValues: NewEntry;
    valSchema: any;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, entryType, initValues, valSchema }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={initValues}
            validationSchema={valSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) =>{
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="DD/MM/YYYY"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            diagnoses={Object.values(diagnoses)}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />

                        <EntryFormExtraFields entryType={entryType} />

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
    
};

export default AddEntryForm;

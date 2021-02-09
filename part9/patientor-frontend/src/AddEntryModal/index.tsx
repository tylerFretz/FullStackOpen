import React from "react";
import { Modal, Segment, Button, Icon } from 'semantic-ui-react';


import { 
    healthCheckSchema, healthCheckInitialValues,
    occupationalHealthcareSchema, occupationalHealthcareInitialValues,
    hospitalSchema, hospitalInitialValues
} from "./EntryFormValidation";
import AddEntryForm from "./AddEntryForm";
import { EntryType, NewEntry } from "../types";

interface Props {
  modalOpen: boolean;
  secondModalOpen: boolean;
  onClose: () => void;
  openSecondModal: () => void;
  closeSecondModal: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, secondModalOpen, openSecondModal, closeSecondModal, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = React.useState(EntryType.HealthCheck);
  const [initValues, setInitValues] = React.useState(healthCheckInitialValues);
  const [valSchema, setValSchema]: any = React.useState(healthCheckSchema);

  const setType = (entryType: EntryType) => {
    if (entryType === EntryType.HealthCheck) {
      setEntryType(EntryType.HealthCheck);
      setInitValues(healthCheckInitialValues);
      setValSchema(healthCheckSchema);
    }
    else if (entryType === EntryType.OccupationalHealthCare) {
      setEntryType(EntryType.OccupationalHealthCare);
      setInitValues(occupationalHealthcareInitialValues);
      setValSchema(occupationalHealthcareSchema);
    }
    else if (entryType === EntryType.Hospital) {
      setEntryType(EntryType.Hospital);
      setInitValues(hospitalInitialValues);
      setValSchema(hospitalSchema);
    }
  }

  return (
  <>
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Choose Entry Type</Modal.Header>
      <Modal.Content>
        <Button.Group labeled fluid icon size="huge">
          <div>
            <Button icon="hospital" content="Hospital" onClick={() => setType(EntryType.Hospital)} />
          </div>
          <div>
            <Button icon="treatment" content="Occupational Healthcare" onClick={() => setType(EntryType.OccupationalHealthCare)} />
          </div>
          <div>  
            <Button icon="doctor" content="Health Check" onClick={() => setType(EntryType.HealthCheck)} />
          </div>
        </Button.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={openSecondModal} primary>
          Next <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>


    <Modal open={secondModalOpen} onClose={closeSecondModal} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm 
          onSubmit={onSubmit}
          onCancel={onClose} 
          entryType={entryType}
          initValues={initValues}
          valSchema={valSchema}
         />
      </Modal.Content>
    </Modal>
  </>
)};

export default AddEntryModal;

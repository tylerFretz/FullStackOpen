import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';
import { makeId } from '../utils';

let savedPatients = [...patients];

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        ssn,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        ...patient,
        id: makeId(20),
        entries: [] as Entry[]
    };

    savedPatients = savedPatients.concat(newPatient);
    return newPatient;
};

export default {
    getPatientById,
    getPatients,
    addPatient
};
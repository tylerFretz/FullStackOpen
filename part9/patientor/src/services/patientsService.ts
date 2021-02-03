import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { makeId } from '../utils';

let savedPatients = [...patients];

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        ...patient,
        id: makeId(20)
    };

    savedPatients = savedPatients.concat(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};
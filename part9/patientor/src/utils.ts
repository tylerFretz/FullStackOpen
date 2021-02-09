/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient, EntryType, NewBaseEntry, HealthCheckRating, SickLeave, Discharge, Diagnosis, NewEntry } from './types';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): boolean => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): boolean => {
    return Boolean(ssn.match(/^[\d\w]+-[\d\w]+$/g));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const isArrayOfStrings = (param: any[]): boolean => {
    const hasNonString: boolean = param.some((item: any) => {
        return !isString(item);
    });
    return !hasNonString;
};

const isHealthCheckRating = (param: any): boolean => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender.toLowerCase())) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender.toLowerCase() as Gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseEntryType = (type: any): EntryType => {
    if (!type || !isString(type) || !isEntryType(type)) {
        throw new Error('Incorrect or missing Entry Type: ' + type);
    }
    return type;
};

const parseDiagnosesCodes = (codes: any): Array<Diagnosis["code"]> => {
    if (!Array.isArray(codes) || !isArrayOfStrings(codes)) {
        throw new Error("Incorrect or missing diagnoses");
    }
    return codes;
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description: " + description);
    }
    return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist: " + specialist);
    }
    return specialist;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing Health Check Rating: " + healthCheckRating);
    }
    return healthCheckRating;
};

const parseCriteria = (criteria: any): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error("Incorrect or missing criteria: " + criteria);
    }
    return criteria;
};

const parseSickLeave = (object: any): SickLeave => {
    if (!object)
        throw new Error("Missing sick leave");
    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
    };
};

const parseDischarge = (object: any): Discharge => {
    if (!object)
        throw new Error("Missing discharge");
    return {
        date: parseDate(object.date),
        criteria: parseCriteria(object.criteria)
    };
};

const parseEmployer = (employer: any): string => {
    if (!employer || !isString(employer)) {
        throw new Error("Incorrect or missing employer: " + employer);
    }
    return employer;
};

export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
};
const toNewBaseEntry = (object: any): NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
        type: parseEntryType(object.type),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };
    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
    }
    return newBaseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
    const newBaseEntry = toNewBaseEntry(object) as NewEntry;

    switch (newBaseEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...newBaseEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case EntryType.OccupationalHealthCare:
            const newEntry = {
                ...newBaseEntry,
                employerName: parseEmployer(object.employer)
            };

            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }

            return newEntry;
        case EntryType.Hospital:
            return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
        default:
            return assertNever(newBaseEntry);
    }
};

export const makeId = (length: number): string => {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length - 1));
    }
    return result;
};

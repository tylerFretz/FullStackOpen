// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NonSensitivePatient = Omit<Patient, 'ssn' >;

export type NewPatient = Omit<Patient, 'id' >;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
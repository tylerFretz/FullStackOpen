export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

//https://stackoverflow.com/questions/57103834/typescript-omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-s
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
    ? Omit<T, K>
    : never;

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

export enum EntryType {
    HealthCheck = "HealthCheck",
    OccupationalHealthCare = "OccupationalHealthcare",
    Hospital = "Hospital"
}

interface BaseEntry {
    id: string;
    type: EntryType;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthCare;
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' >;

export type NewPatient = Omit<Patient, 'id' | 'entries' >;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewBaseEntry = Omit<BaseEntry, 'id' >;

//https://stackoverflow.com/questions/57103834/typescript-omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-s
export type NewEntry = DistributiveOmit<Entry, "id">;
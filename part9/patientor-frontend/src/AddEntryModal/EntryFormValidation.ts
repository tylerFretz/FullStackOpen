import * as yup from "yup";

import { EntryType, NewEntry } from "../types";

export const baseSchema = yup.object().shape({
    description: yup.string()
        .min(2, "Too Short!")
        .max(250, "Too Long")
        .required(),
    date: yup.date()
        .required()
        .default(() => new Date()),
    specialist: yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long")
        .required(),
    diagnosisCodes: yup.array()
        .of(yup.string())
});

export const healthCheckSchema = baseSchema.concat(
    yup.object().shape({
        healthCheckRating: yup.number()
            .typeError("Must be a number")
            .min(0)
            .max(3)
            .required("Please enter a number from 0(great) - 3(critical)")
    })
);

export const occupationalHealthcareSchema = baseSchema.concat(
    yup.object().shape({
        employerName: yup.string()
            .min(2, "Too Short!")
            .required(),
        sickLeave: yup.object().shape({
            startDate: yup.date(),
            endDate: yup.date()
        })
    })
);

export const hospitalSchema = baseSchema.concat(
    yup.object().shape({
        discharge: yup.object().shape({
            date: yup.date(),
            criteria: yup.string().min(2)
        })
    })
);


const baseInitialValues = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [""]
};

export const healthCheckInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0
};

export const occupationalHealthcareInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.OccupationalHealthCare,
    employerName: "",
    sickLeave: { startDate: "", endDate: "" }
};

export const hospitalInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: { date: "", criteria: "" }
};


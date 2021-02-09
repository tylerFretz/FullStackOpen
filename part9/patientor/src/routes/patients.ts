/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
        res.json(patient);
    }
    else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

router.post('/:id/entries', (req, res) => {
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
        try {
            const newEntry = toNewEntry(req.body);
            const updatedPatient = patientsService.addEntry(newEntry, patient);
            res.json(updatedPatient);
        }
        catch (e) {
            res.status(400).send({ error: e.message });
        }
    } else {
        res.status(404).send({ error: "Sorry, this patient does not exist" });
    }
});

export default router;
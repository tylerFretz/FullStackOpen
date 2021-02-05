import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getAll = (): Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getAll
};
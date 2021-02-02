import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    const { query } = req;
    const { height, weight } = query;


    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    const { dailyExercises, target }: any = req.body;

    if (!target || !dailyExercises) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Array.isArray(dailyExercises) || isNaN(target)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const response = calculateExercises(dailyExercises, target);
    
    return res.json(response);
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
interface InputValues {
    dailyHours: Array<number>;
    target: number;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


const parseArgs = (args: Array<string>): InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = args[args.length - 1];
    let weekArr = args.slice(2, args.length - 1);
    weekArr[0] = weekArr[0].replace("[", "")
    

    if (!weekArr.some(num => isNaN(parseFloat(num))) && !isNaN(Number(target))) {
        return {
            dailyHours: weekArr.map(num => parseFloat(num)),
            target: Number(target)
        }
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (dailyHours: Array<number>, target: number): Result => {

    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(d => d !== 0).length
    const average = dailyHours.reduce((total, current) => total + current) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;

    const level2Min = target * 0.8;
    const level3Min = target * 1.2;

    if (average < level2Min) {
        rating = 1;
        ratingDescription = "Try harder"
    }
    else if (average >= level3Min) {
        rating = 3;
        ratingDescription = "Killing it"
    }
    else {
        rating = 2;
        ratingDescription = "Keep at it"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { dailyHours, target } = parseArgs(process.argv);
    console.log(calculateExercises(dailyHours, target));
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

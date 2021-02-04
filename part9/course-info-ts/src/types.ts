export interface CoursePartBase {
id: string;
name: string;
exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
description?: string;
}

interface CoursePartOne extends CoursePartBaseWithDesc {
name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
name: "Using props to pass data";
groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseWithDesc {
name: "Deeper type usage";
exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDesc {
    name: "My part";
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;
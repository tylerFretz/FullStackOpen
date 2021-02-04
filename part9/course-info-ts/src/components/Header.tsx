import React from "react";

//The Header component should take care of rendering the name of the course.

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
    <h1>{courseName}</h1>
);

export default Header;

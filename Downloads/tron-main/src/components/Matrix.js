import React from 'react';

const Matrix = ({ matrix }) => {
    return (
        <div>
        <h1>Matrix</h1>
        <table>
            <thead>
            <tr>
                <th>Level</th>
                <th>Left</th>
                <th>Right</th>
            </tr>
            </thead>
            <tbody>
            {matrix.map((level, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{level.left}</td>
                <td>{level.right}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    };

    export default Matrix;
    
import React from 'react';
import Error500 from './Error500';

const Error500Test: React.FC = () => {
    // Simulating a scenario where an error occurs.
    const error = true;

    if (error) return <Error500 />;
    return <div>Data loaded successfully</div>;
}

export default Error500Test;



//For testing perpuse only.
//when you navigate to /500-test, it should run the Error500Test component, which will attempt to run the failing GraphQL query, and if it encounters an error (which it should), it will render the Error500 component.
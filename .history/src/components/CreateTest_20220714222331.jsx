import React, { useState } from 'react';
import QuestionForm1 from './QuestionForms/QuestionForm1';

const CreateTest = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        fAnswer1: "",
        fAnswer2: "",   
    });

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };

    const next = () => {
    setCurrentStep(currentStep + 1);
    };
    const back = () => {
        setCurrentStep(currentStep - 1);
    };

    switch(currentStep) {
        case 1:
            return (
                <QuestionForm1
                    data={formData}
                    handleChange={handleChange}
                    next={next}
                />
            );
    }
    return (
        <>
        </>
    )
}

export default CreateTest

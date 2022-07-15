import React, { useState } from 'react';
import QuestionForm1 from './QuestionForms/QuestionForm1';
import QuestionForm2 from './QuestionForms/QuestionForm2';
import QuestionForm3 from './QuestionForms/QuestionForm3';

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
        case 2:
            return (
                <QuestionForm2
                    data={formData}
                    handleChange={handleChange}
                    next={next}
                    back={back}
                />
            );
        case 3:
            return (
                <QuestionForm3
                    data={formData}
                    handleChange={handleChange}
                    next={next}
                    back={back}
                />
            );
    }
    return (
        <>
        </>
    )
}

export default CreateTest

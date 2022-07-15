import React, { useState } from 'react';
import QuestionForm1 from './QuestionForms/QuestionForm1';
import QuestionForm2 from './QuestionForms/QuestionForm2';
import QuestionForm3 from './QuestionForms/QuestionForm3';
import SubmitTest from './SubmitTest';

const CreateTest = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        question1: "",
        answer1: "",
        fAnswer11: "",
        fAnswer12: "",
        question2: "",
        answer2: "",
        fAnswer21: "",
        fAnswer22: "",
        question3: "",
        answer3: "",
        fAnswer31: "",
        fAnswer32: "",
        question4: "",
        answer4: "",
        fAnswer41: "",
        fAnswer42: "",
        question5: "",
        answer5: "",
        fAnswer51: "",
        fAnswer52: "",
        question6: "",
        answer6: "",
        fAnswer61: "",
        fAnswer62: "",   
        question7: "",
        answer7: "",
        fAnswer71: "",
        fAnswer72: "",
        question8: "",
        answer8: "",
        fAnswer81: "",
        fAnswer82: "",
        question9: "",
        answer9: "",
        fAnswer91: "",
        fAnswer92: "",
        question10: "",
        answer10: "",
        fAnswer101: "",
        fAnswer102: "",
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
        default:
        return <SubmitTest data={formData} back={back} />
    };  
}

export default CreateTest
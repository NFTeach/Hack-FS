import React, { useState } from 'react';
import QuestionForm1 from './QuestionForms/QuestionForm1';
import QuestionForm2 from './QuestionForms/QuestionForm2';
import QuestionForm3 from './QuestionForms/QuestionForm3';
import QuestionForm4 from './QuestionForms/QuestionForm4';
import QuestionForm5 from './QuestionForms/QuestionForm5';
import QuestionForm6 from './QuestionForms/QuestionForm6';
import QuestionForm7 from './QuestionForms/QuestionForm7';
import QuestionForm8 from './QuestionForms/QuestionForm8';
import QuestionForm9 from './QuestionForms/QuestionForm9';
import QuestionForm10 from './QuestionForms/QuestionForm10';
import SubmitTest from './SubmitTest';

const CreateTest = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        Question_1: "",
        Answer_1: "",
        Question_1_False_Answer_1: "",
        Question_1_False_Answer_2: "",
        Question_1_False_Answer_3: "",
        Question_2: "",
        Answer_2: "",
        Question_2_False_Answer_1: "",
        Question_2_False_Answer_2: "",
        Question_2_False_Answer_3: "",
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
        case 4:
            return (
                <QuestionForm4
                    data={formData}
                    handleChange={handleChange}
                    next={next}
                    back={back}
                />
            );
        case 5:
            return (
            <QuestionForm5
                data={formData}
                handleChange={handleChange}
                next={next}
                back={back}
            />
        );
        case 6:
            return (
            <QuestionForm6
                data={formData}
                handleChange={handleChange}
                next={next}
                back={back}
            />
        );
        case 7:
            return (
            <QuestionForm7
                data={formData}
                handleChange={handleChange}
                next={next}
                back={back}
            />
        );
        case 8:
            return (
            <QuestionForm8
                data={formData}
                handleChange={handleChange}
                next={next}
                back={back}
            />
        );
        case 9:
            return (
            <QuestionForm9
                data={formData}
                handleChange={handleChange}
                next={next}
                back={back}
            />
        );
        case 10:
            return (
            <QuestionForm10
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
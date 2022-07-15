import React from 'react'

const QuestionForm1 = (props) => {
    const { data, handleChange, next } = props;

    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Create Multiple Choice Test Below"}
                >
                    <Text style={styles.text}>
                        Question 1 
                    </Text>
                    <TextArea
                        placeholder="What is the question?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        // onChange={(e) => setDescriptionText(e.target.value)}
                        // value={descriptionText}
                    />
                    <Text style={styles.text}>
                        Answer
                    </Text>
                    <TextArea
                        placeholder="What is correct answer?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        // onChange={(e) => setDescriptionText(e.target.value)}
                        // value={descriptionText}
                    />
                    <Text style={styles.text}>
                        False Answer 1
                    </Text>
                    <TextArea
                        placeholder="What is first false answer?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        // onChange={(e) => setDescriptionText(e.target.value)}
                        // value={descriptionText}
                    />
                    <Text style={styles.text}>
                        False Answer 2
                    </Text>
                    <TextArea
                        placeholder="What is second false answer?"
                        showCount
                        maxLength={512}
                        style={{ height: 100}}
                        autoSize={{ minRows: 2, maxRows: 2 }}
                        // onChange={(e) => setDescriptionText(e.target.value)}
                        // value={descriptionText}
                    />
                    <Button
                        style={styles.button}
                        type="primary"
                        // loading={isQuestionSubmitInProcess}
                        // onClick={async () => {
                        //     setIsQuestionSubmitInProcess(true);
                        //     await uploadQuestionToMoralis();
                        // }}
                    >
                        Submit Question
                    </Button>
                </Card>
            </main>
        </div>
    )
}

export default QuestionForm1

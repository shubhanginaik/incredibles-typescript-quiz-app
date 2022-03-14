import React from "react";
type Props= {
    question: string;
    answers:string[];
    callback:any;
    userAnswer:any;
    questionNo:number;
    totalquestions:number;

}

const QuestionCard: React.FC<Props>= ({question, answers,callback,userAnswer,questionNo,totalquestions}) =>
(
    <div>
        <p className="number">
            Question:{questionNo}/{totalquestions}
        </p>

        <p dangerouslySetInnerHTML={{__html:question}} />
        <div>
            {answers.map(answer=>(
                <div>
                    <button disabled={userAnswer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}></span>
                    </button>
                </div>

            ))}
        </div>
    </div>
)
     


export default QuestionCard;
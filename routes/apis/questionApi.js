import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";


const getQuestion = async ({ response }) => {
    let res = await questionService.selectRandomQuestion();

    if (res.length === 0) {
        response.status = 404;
        return;
    }
    const question = res[0];
    const options = await answerOptionService.getOptionsById(question.id);
    
    const formattedOptions = options.map(option => {
        return {
            optionId: option.id,
            optionText: option.option_text,
        }
    })

    const responseJson = {
        questionId: question.id,
        questionTitle: question.title,
        questionText: question.question_text,
        answerOptions: formattedOptions,
    };
    
    response.body = responseJson;
};

const answerQuestion = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    
    const wasCorrect = await answerOptionService.checkIfOptionIsCorrect(document.questionId, document.optionId);
    response.body = {
        correct: wasCorrect,
    };
};

export {
    getQuestion,
    answerQuestion,
}
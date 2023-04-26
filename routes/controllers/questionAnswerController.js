import * as questionAnswerService from "../../services/questionAnswerService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const handleQuestionAnswer = async ({ params, response, user }) => {
    const id = params.id;
    const optionId = params.optionId;
    
    const correctAnswers = await answerOptionService.getCorrectOptions(id);
    const correctAnswerIds = correctAnswers.map(answer => answer.id);
    
    const answerIsCorrect = correctAnswerIds.includes(Number(optionId));
    
    await questionAnswerService.addAnswer(user.id, id, optionId, answerIsCorrect);

    if (answerIsCorrect) {
        response.redirect(`/quiz/${id}/correct`);
    } else {
        response.redirect(`/quiz/${id}/incorrect`);
        
    }
};

const handleRightAnswer = async({ render }) => {
    render("correct.eta");
};

const handleWrongAnswer = async({ render, params }) => {
    const correctAnswers = await answerOptionService.getCorrectOptions(params.id);
    const answerTexts = correctAnswers.map(answer => answer.option_text);
    const data = {
        answerTexts,
    }

    render("incorrect.eta", data);
}

export {
    handleQuestionAnswer,
    handleRightAnswer,
    handleWrongAnswer,
}
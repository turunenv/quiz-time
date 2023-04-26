import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";

const selectRandomQuestion = async({ render }) => {
    const res = await questionService.selectRandomQuestion();
    const data = {};

    if (res.length === 0) {
        data.noQuestions = true;
    } else {
        const question = res[0];
        data.question = question;
        data.options = await answerOptionService.getOptionsById(question.id);
    }
    
    render("quiz.eta", data);
};

const selectRandomQuestionId = async({ response }) => {
    const res = await questionService.selectRandomQuestion();
    let id;
    if (res[0]) {
        id = res[0].id;
    } else {
        id = null;
    }
    
    response.redirect(`/quiz/${id}`)
}

const selectQuestionById = async ({ render, params, response, user }) => {
    
    if (params.id === "null") {
        render("quiz.eta", { noQuestions: true});
        return;
    };
    
    const questionData = await questionService.getQuestionById(params.id, user.id)

    const data = {
        question: questionData[0],
        options: await answerOptionService.getOptionsById(params.id),
    };

    
    if (!data.question.id) {
        response.status = 404;
        return;
    };
    render("quiz.eta", data);
};

export {
    selectRandomQuestion,
    selectQuestionById,
    selectRandomQuestionId
}


import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";
import { required, minLength, validate } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const getOptionData = async (request, question_id, user_id) => {
    //check authorization before continuing
    const question = await questionService.getQuestionById(question_id, user_id);
    
    if (question.length === 0) {
        return false;
    };
    
    const body = request.body({ type: "form" });
    const params = await body.value;

    const data = {
        option_text: params.get("option_text"),
        is_correct: params.get("is_correct") ? true : false,
        options: await answerOptionService.getOptionsById(question_id, user_id),
    };
    
    return data;
};

const validateOption = async({ option_text }) => {
    const validationRules = {
        option_text: [required, minLength(1)],
    };
    const data = {
        option_text,
    };

    return await validate(data, validationRules);
};


const addAnswerOption = async({ request, response, params, render, user }) => {
    //is the user authorized to do this?
    const data = await getOptionData(request, params.id, user.id);

    if (!data) {
        response.status = 401;
        return;
    }

    const [passes, errors] = await validateOption(data);
    
    if (!passes) {
        data.errors = errors;
        
        const rows = await questionService.getQuestionById(params.id, user.id);
        const question = rows[0];

        data.title = question.title;
        data.question_text = question.question_text;
        data.id = params.id;
        
        render("question.eta", data);
    } else {
        await answerOptionService.addAnswerOption(params.id, data.option_text, data.is_correct);
        response.redirect(`/questions/${params.id}`);
    }
};

const deleteAnswerOption = async ({ params, response, user }) => {
    const questionId = params.id;
    const optionId = params.optionId;

    //check auth
    const question = await questionService.getQuestionById(questionId, user.id);
    if (question.length === 0) {
        response.status = 401;
        return;
    };

    //Delete possible answers first
    await questionAnswerService.removeAnswers(optionId, questionId);
    await answerOptionService.deleteAnswerOptionById(optionId);

    response.redirect(`/questions/${questionId}`);


}

export {
    addAnswerOption,
    deleteAnswerOption,
};
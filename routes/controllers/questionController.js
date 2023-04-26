import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import { required, minLength, validate } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validateQuestionData = async({ title, question_text }) => {
    const validationRules = {
        title: [required, minLength(1)],
        question_text: [required, minLength(1)],
    };
    const data = {
        title,
        question_text,
    };
    return await validate(data, validationRules);
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const data = {
        title: params.get("title"),
        question_text: params.get("question_text"),
    }

    return data;
}

const addQuestion = async ({ request, response, render, user }) => {
    const data = await getQuestionData(request);
    const [passes, errors] = await validateQuestionData(data);

    if (!passes) {
        data.errors = errors;
        data.questions = await questionService.listOwnQuestionsAndOptions(user.id);
        render("questions.eta", data);
    } else {
        await questionService.addQuestion(
            user.id,
            data.title,
            data.question_text,
        );
        response.redirect("/questions");
    };   
}

const listOwnQuestions = async ({ render, user }) => {
    const data = { 
                    questions: await questionService.listOwnQuestionsAndOptions(user.id), 
                    title: "", 
                    question_text: "", 
                };
    render("questions.eta", data);
};

const showSingleQuestion  = async ({ params, render, user, response }) => {
    const id = params.id;

    //force authorization: is the currect user the owner of the question attempted to be accessed?
    const res = await questionService.getQuestionById(id, user.id);
    
    if (res.length === 0) {
        response.status = 401;
        return;
    }

    const data = res[0];
    data.options = await answerOptionService.getOptionsById(id);
    data.option_text = "";

    render("question.eta", data);
};

const deleteQuestion = async ({ params, response, user }) => {
    const id = params.id;
    await questionService.deleteQuestion(id, user.id);

    response.redirect("/questions")
};

export { 
    addQuestion,
    listOwnQuestions,
    showSingleQuestion,
    deleteQuestion,
 };
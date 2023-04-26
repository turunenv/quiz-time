import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js";
import * as quizController from "./controllers/quizController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as questionAnswerController from "./controllers/questionAnswerController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/questions", questionController.listOwnQuestions);
router.post("/questions", questionController.addQuestion);

router.get("/questions/:id", questionController.showSingleQuestion);
router.post("/questions/:id/options", answerOptionController.addAnswerOption);

router.get("/quiz", quizController.selectRandomQuestionId);
router.get("/quiz/:id", quizController.selectQuestionById);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.post("/quiz/:id/options/:optionId", questionAnswerController.handleQuestionAnswer);
router.get("/quiz/:id/correct", questionAnswerController.handleRightAnswer);
router.get("/quiz/:id/incorrect", questionAnswerController.handleWrongAnswer)

router.post("/questions/:id/options/:optionId/delete", answerOptionController.deleteAnswerOption);

router.post("/questions/:id/delete", questionController.deleteQuestion);

router.get("/statistics", statisticsController.showStatistics);

router.get("/api/questions/random", questionApi.getQuestion);
router.post("/api/questions/answer", questionApi.answerQuestion);


export { router };

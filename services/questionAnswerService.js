import { executeQuery } from "../database/database.js";

const addAnswer = async (user_id, question_id, question_answer_option_id, correct) => {
    await executeQuery(`INSERT INTO question_answers 
                        (user_id, question_id, question_answer_option_id, correct)
                        VALUES ($1, $2, $3, $4)`,
                        user_id,
                        question_id,
                        question_answer_option_id,
                        correct
                        );
};

const removeAnswers = async (option_id, question_id) => {
    await executeQuery(`DELETE FROM question_answers WHERE question_answer_option_id = $1 AND question_id = $2;`,
                        option_id,
                        question_id,
                        );
};

export {
    addAnswer,
    removeAnswers,
}
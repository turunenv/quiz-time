import { executeQuery } from "../database/database.js";

const addAnswerOption  = async (question_id, option_text, is_correct) => {
    await executeQuery(`INSERT INTO question_answer_options (question_id, option_text, is_correct)
                        VALUES ($1, $2, $3);`,
                        question_id,
                        option_text,
                        is_correct,
                        );
};

const getOptionsById = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $1;",
                                    question_id,
                                );
    return res.rows;
};

const deleteAnswerOptionById = async (option_id) => {
    await executeQuery(
                        "DELETE FROM question_answer_options WHERE id = $1;",
                        option_id,
                        );
};

const getCorrectOptions = async (question_id) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options 
                        WHERE question_id = $1 AND is_correct = $2;`,
                        question_id,
                        true,
                        );
    return res.rows;
};

const checkIfOptionIsCorrect = async (question_id, option_id) => {
    const res = await executeQuery(`SELECT is_correct FROM question_answer_options
                                    WHERE question_id = $1 AND id = $2;`,
                                    question_id,
                                    option_id,
                                );
    return res.rows[0];
};

export {
    addAnswerOption,
    getOptionsById,
    deleteAnswerOptionById,
    getCorrectOptions,
    checkIfOptionIsCorrect,
};
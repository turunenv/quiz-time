import { executeQuery } from "../database/database.js";

const getAnswerCount = async (user_id) => {
    const res = await executeQuery(`
                                    SELECT COUNT(*) FROM question_answers
                                    WHERE user_id = $1;`,
                                    user_id,
                                );
    return res.rows[0];
};

const getCorrectAnswerCount = async (user_id) => {
    const res = await executeQuery(`
                                    SELECT COUNT(*) FROM question_answers
                                    WHERE user_id = $1 AND correct = $2;`,
                                    user_id,
                                    true,
                                );
    return res.rows[0];
};

const getOwnQuestionsAnswerCount = async (user_id) => {
    const res = await executeQuery(`
                                    SELECT COUNT(*)
                                    FROM question_answers LEFT JOIN questions 
                                    ON questions.id = question_answers.question_id
                                    WHERE questions.user_id = $1;`,
                                    user_id,
                                );
    return res.rows[0];
}

const getTopFiveWithMostAnswers = async () => {
    const res = await executeQuery(`
                                    SELECT users.email, COUNT(question_answers.id)
                                    FROM users LEFT JOIN question_answers
                                    ON users.id = question_answers.user_id
                                    GROUP BY users.id
                                    ORDER BY count DESC
                                    LIMIT 5;
                                `);
    return res.rows;
};

export {
    getAnswerCount,
    getCorrectAnswerCount,
    getTopFiveWithMostAnswers,
    getOwnQuestionsAnswerCount,
}
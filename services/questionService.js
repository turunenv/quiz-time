import { executeQuery } from "../database/database.js";

const addQuestion = async(user_id, title, question_text) => {
    await executeQuery(
        `INSERT INTO questions (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
        user_id,
        title,
        question_text,
    );
};

const listOwnQuestionsAndOptions = async(user_id) => {
    const res = await executeQuery(`SELECT q.title, COUNT(o.option_text), q.id
                                    FROM questions q LEFT JOIN question_answer_options o
                                    ON q.id = o.question_id
                                    WHERE q.user_id = $1
                                    GROUP BY q.id;`,
                                    user_id,
                                    );

    return res.rows;
};

//force authorization by checking user_id
const getQuestionById = async (id, user_id) => {
    const res = await executeQuery(
            "SELECT * FROM questions WHERE id = $1 AND user_id = $2;",
            id, 
            user_id,
            );

    return res.rows;
};


const selectRandomQuestion = async () => {
    const res = await executeQuery(`SELECT * FROM questions
                                    OFFSET floor( random() * (
                                        SELECT COUNT (*) FROM questions
                                    ))`
                                );
    
    return res.rows;
};

const deleteQuestion = async (id, user_id) => {
    await executeQuery("DELETE FROM questions WHERE id = $1 AND user_id = $2;",
                        id,
                        user_id,
                        );
};

export { 
    addQuestion,
    listOwnQuestionsAndOptions,
    getQuestionById,
    selectRandomQuestion,
    deleteQuestion,
 };
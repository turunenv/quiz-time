import * as statisticsService from "../../services/statisticsService.js";

const topFiveToArray = (users) => {
    const userArr = users.map(user => {
        return [user.email, Number(user.count)];
    })
    return userArr;
}



const showStatistics = async ({ user, render }) => {
    const answerCountObj = await statisticsService.getAnswerCount(user.id);
    const answerCount = Number(answerCountObj.count);
    
    const correctAnswerCountObj = await statisticsService.getCorrectAnswerCount(user.id);
    const correctAnswerCount = Number(correctAnswerCountObj.count);

    const percentage = correctAnswerCount/answerCount * 100 || 0;
    const percentageStr = `${percentage.toFixed(1)} %`;
    
    const ownQuestionsAnswerCountObj = await statisticsService.getOwnQuestionsAnswerCount(user.id);
    const ownQuestionsAnswerCount = Number(ownQuestionsAnswerCountObj.count);
    
    const topFive = topFiveToArray(await statisticsService.getTopFiveWithMostAnswers());

    const data = {
        answerCount,
        correctAnswerCount,
        percentageStr,
        ownQuestionsAnswerCount,
        topFive,
    }
    
    render("statistics.eta", data);
};

export {
    showStatistics,
}
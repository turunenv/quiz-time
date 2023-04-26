import { app } from "../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts";


function responseHasRightProperties (res) {
    
    if (!res.body.questionText || !res.body.answerOptions) {
        throw new Error("Response is missing questionText or answerOptions")
    } 
};

//this fails if no questions have been added
Deno.test({
    name: "GET request to '/api/questions/random' should return a random question as JSON-document",
    fn: async () => {
        const testClient = await superoak(app);
        await testClient.get("/api/questions/random")
        .expect(200)
        .expect(responseHasRightProperties);
    },
    sanitizeResources: false,
    sanitizeOps: false,
})




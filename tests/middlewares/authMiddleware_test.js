import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts"
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { app } from "../../app.js";

Deno.test({
    name: "unauthorized GET-request to /questions redirects to /auth/login", 
    fn: async () => {
        const testClient = await superoak(app);

        //log in the user based on credentials given as command-line parameters
        await testClient.get("/questions")
        .expect(res => res.headers.location === "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
})

Deno.test({
    name: "unauthorized GET-request to /quiz/something redirects to /auth/login", 
    fn: async () => {
        const testClient = await superoak(app);

        //log in the user based on credentials given as command-line parameters
        await testClient.get("/quiz.something")
        .expect(res => res.headers.location === "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
})

Deno.test({
    name: "unauthorized GET-request to /statistics/something redirects to /auth/login", 
    fn: async () => {
        const testClient = await superoak(app);

        //log in the user based on credentials given as command-line parameters
        await testClient.get("/statistics.something")
        .expect(res => res.headers.location === "/auth/login");
    },
    sanitizeResources: false,
    sanitizeOps: false,
})
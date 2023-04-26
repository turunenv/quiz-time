import { showLoginForm } from "../../../routes/controllers/loginController.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts"
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { app } from "../../../app.js";
import myContext from "../../myContext.js";


Deno.test({
        name: "calling showLoginForm renders 'login.eta'", 
        fn: () => {
        assertEquals(myContext(showLoginForm), "login.eta");
        },
        sanitizeResources: false,
        sanitizeOps: false,
    },
    
);


Deno.test({
    name: "login with existing credentials redirects to /questions", 
    fn: async () => {
        const testClient = await superoak(app);

        //log in the user based on credentials given as command-line parameters
        await testClient.post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(`email=${Deno.env.get("EMAIL")}&password=${Deno.env.get("PASSWORD")}`)
        .expect(res => res.headers.location === "/questions");
    },
    sanitizeResources: false,
    sanitizeOps: false,
})

Deno.test({
    name: "login with wrong credentials notifies user with a message", 
    fn: async () => {
        const testClient = await superoak(app);

        //log in the user based on credentials given as command-line parameters
        await testClient.post("/auth/login")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(`email=thisIsWring&password=doesntExist`)
        .expect(res => res.text.includes("Incorrect login credentials, please try again."));
    },
    sanitizeResources: false,
    sanitizeOps: false,
})
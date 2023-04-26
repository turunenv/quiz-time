import { showRegistrationForm, registerUser } from "../../../routes/controllers/registrationController.js";
import { superoak } from "https://deno.land/x/superoak@4.3.0/mod.ts"
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { app } from "../../../app.js";
import myContext from "../../myContext.js";

Deno.test({
        name: "showRegistrationForm renders 'registration.eta'", 
        fn: () => {
            assertEquals(myContext(showRegistrationForm), "registration.eta");
        },
        sanitizeResources: false,
        sanitizeOps: false,
});


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
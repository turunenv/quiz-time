import { showMain } from "../../../routes/controllers/mainController.js";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import myContext from "../../myContext.js";


Deno.test("showMain-function calls render with the parameter 'main.eta'", () => {
    assertEquals(myContext(showMain), "main.eta");
})
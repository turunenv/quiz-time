import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
};

const getRegistrationData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    return {
        email: params.get("email"),
        password: params.get("password"),
    };
};

const showRegistrationForm = ({ render }) => {
    render("registration.eta", { email: ""});
};

const registerUser = async ({ request, response, render }) => {
    
    const data = await getRegistrationData(request);
    const [passes, errors] = await validasaur.validate(data, validationRules);

    

    if (!passes) {
        data.errors = errors;
        delete data.password;

        render("registration.eta", data)
    } else {
        await userService.addUser(
            data.email,
            await bcrypt.hash(data.password),
        );
        response.redirect("/auth/login");
    };

    
}

export {
    showRegistrationForm,
    registerUser,
};
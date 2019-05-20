import {request} from "https";

Parse.Cloud.beforeSave(Parse.User, (request, response) => {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const usernameRegex = /^[a-z\d]{5,12}$/i;
    const passwordRegex = /^[\w@-]{8,20}$/;

    let user = request.object; 

    if (emailRegex.test(user.get("email"))) {
        response.success();
    } else {
        response.error("Email must be a valid address, e.g. me@mydomain.com");
    }

    if (usernameRegex.test(user.get("username"))) {
        response.success();
    } else {
        response.error("Username must be  and contain 5 - 12 characters. ")
    }

    if (passwordRegex.test(user.get("password"))) {
        response.success();
    } else {
        response.error("Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters. ");
    }

});
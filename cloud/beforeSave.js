
Parse.Cloud.beforeSave(Parse.User, (request) => {
    let emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    let usernameRegex = /^[a-z\d]{5,12}$/i;
    let passwordRegex = /^[\w@-]{8,20}$/;

    let user = request.object; 

    if (emailRegex.test(user.get("email"))) {
        console.log('Success');
    } else {
        throw "Email must be a valid address, e.g. me@mydomain.com";
    }

    if (usernameRegex.test(user.get("username"))) {
        console.log('Success');        
    } else {
        throw "Username must be  and contain 5 - 12 characters.";
    }

    if (passwordRegex.test(user.get("password"))) {
        console.log('Success');
    } else {
        throw "Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters. ";
    }
});
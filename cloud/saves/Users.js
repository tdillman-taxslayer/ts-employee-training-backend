// Users default class Saves
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



Parse.Cloud.afterSave(Parse.User, async req => {
    console.log(req.object.attributes.firstName);
    console.log(req.object.attributes.lastName);

    // Init new employee 
    const query = new Parse.Query("Employee");
    console.log(query);

    query.equalTo("Owner", req.object);
    let u = await query.first({
        useMasterKey: true
    });

    if (!u) {
        let newEmployee = new Parse.Object("Employee");
        newEmployee.set("Owner", req.object);
        newEmployee.set("firstName", req.object.attributes.firstName);
        newEmployee.set("lastName", req.object.attributes.lastName);
        await newEmployee.save({}, {
            useMasterKey: true
        });
    }

    const rquery = new Parse.Query(Parse.Role);
    rquery.equalTo("name", "employee");
    const employeeRole = await rquery.first({
        useMasterKey: true
    });
    employeeRole.relation("users").add(req.object);
    await employeeRole.save({}, {
        useMasterKey: true
    })
})
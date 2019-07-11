Parse.Cloud.define("skills", async request => {
  // Request is JSON with skill, name, and user pointer object
  console.log(request.params);
  //   console.log(request);

  const obj = request.params;
  const skill = obj.skill.toLowerCase().trim();
  const name = obj.name.toLowerCase().trim();
  const user = request.params.user;

  if (!request.params.skill) return "Adding or Deleting a skill?";
  if (!user.__type === "Pointer") return "User?";
  if (!user.className === "_User") return "User?";
  if (!typeof user.objectId === "string") return "User?";
  if (!typeof user === "object") return "User?";

  if (skill === "add") {
    const Skills = Parse.Object.extend("Skills");
    const skill = new Skills();

    skill.set("name", name);
    skill.set("user", user);
    skill.save();

    return "Added Successfully";
  }

  if (skill === "delete") {
    const Skills = Parse.Object.extend("Skills");
    const query = new Parse.Query(Skills);
    query.equalTo("name", name);
    query.equalTo("user", user);

    await query.first().then(results => results.destroy());

    /*
    const results = await query.first();
    console.log(results);
    console.log("Id: ", results.id);
    */

    return "Delete Successfully";
  }

  return null;
});

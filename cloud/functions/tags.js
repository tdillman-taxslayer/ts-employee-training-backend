Parse.Cloud.define("tags", async request => {
  // Request is JSON with tag, name, and user pointer object
  console.log(request.params);
  //   console.log(request);

  const obj = request.params;
  const tag = obj.tag.toLowerCase().trim();
  const name = obj.name.toLowerCase().trim();
  const user = request.params.user;

  if (!request.params.tag) return "Adding or Deleting a tag?";
  if (!user.__type === "Pointer") return "User?";
  if (!user.className === "_User") return "User?";
  if (!typeof user.objectId === "string") return "User?";
  if (!typeof user === "object") return "User?";

  if (tag === "add") {
    const Tags = Parse.Object.extend("Tags");
    const tag = new Tags();

    tag.set("name", name);
    tag.set("user", user);
    tag.save();
  }

  if (tag === "delete") {
    const Tags = Parse.Object.extend("Tags");
    const query = new Parse.Query(Tags);
    query.equalTo("name", name);
    query.equalTo("user", user);

    await query.first().then(results => results.destroy());

    /*
    const results = await query.first();
    console.log(results);
    console.log("Id: ", results.id);
    */
  }

  return null;
});

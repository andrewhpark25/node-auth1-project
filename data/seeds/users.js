exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      id:1,
      username: "admin",
      password: "keepitsecret,keepitsafe.",
    },
    { id:2,
      username: "me",
      password: "changethepass",
    },
    {
      id:3,
      username: "nobody",
      password: "hasnorole",
    }
  ];

  return knex("users").insert(users);
};

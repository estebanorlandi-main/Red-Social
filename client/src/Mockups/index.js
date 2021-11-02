const fs = require("fs");
let users = require("./users.json");
let posts = require("./posts.json");

/*
users = users.map((user) => {
  if (!user) return;
  const change = "firstName";
  const by = "name";

  user[by] = user[change];
  delete user[change];

  return user;
});

users = users.filter((user) => user);
console.log(users[0].name, users[0].firstName);
fs.writeFileSync("newUsers.json", JSON.stringify(users));

//*/

console.log(posts[0].creator);
posts = posts.map((post) => {
  if (!post) return;

  const rUser = users[Math.floor(Math.random() * users.length)];

  post.creator = { avatar: rUser.avatar, username: rUser.username };

  return post;
});

posts = posts.filter((post) => post);
// console.log(posts[0].creator);
fs.writeFileSync("newPosts.json", JSON.stringify(posts));

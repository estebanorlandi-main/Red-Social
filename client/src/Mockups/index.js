const fs = require("fs");
let posts = require("./posts.json");
let users = require("./users.json");

let newComments = require("./newData/CommentsRandom.json");
let newPosts = require("./newData/postData.json");

// change likes

//*
posts = posts.map((post) => {
  if (!post) return;

  const cantLikes = Math.floor(Math.random() * users.length);
  post.likes = [];

  for (let i = 0; i < cantLikes; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    post.likes.push(randomUser.username);
  }
  return post;
});
//*/

// filter undef
posts = posts.filter((posts) => posts);

fs.writeFileSync("newPosts.json", JSON.stringify(posts));

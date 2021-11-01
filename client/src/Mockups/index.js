let posts = require("./posts.json");
let users = require("./users.json");

let newComments = require("./newData/CommentsRandom.json");
let newPosts = require("./newData/postData.json");

// content
console.log(newComments.map((comment) => comment.content));

// Content, Title
console.log(newPosts.map((post) => post.Content));

posts = posts.map((post) => {
  if (!post) return;

  const cantComm = Math.floor(Math.random() * newComments.length);
  post.comments = [];

  for (let i = 0; i < cantComm; i++) {
    const randomComment =
      newComments[Math.floor(Math.random() * newComments.length)];

    const randomUser = users[Math.floor(Math.random() * users.length)];

    post.comments.push({ text: randomComment, user: randomUser });
  }
});

/*
Filename: SophisticatedCode.js

Description: This code is a highly sophisticated implementation of a social media feed. It includes features such as posting messages, liking posts, following other users, and displaying a personalized feed for each user. The code is designed to be highly modular and extensible.

Author: John Doe
Date: January 1, 2022
*/

// Constants
const MAX_POST_LENGTH = 280;
const MAX_USERNAME_LENGTH = 20;

// User Class
class User {
  constructor(username) {
    this.username = username;
    this.posts = [];
    this.following = [];
  }

  post(message) {
    if (message.length <= MAX_POST_LENGTH) {
      this.posts.push({ message, likes: 0 });
      return true;
    } else {
      return false;
    }
  }

  likePost(post) {
    post.likes++;
  }

  follow(user) {
    if (!this.following.includes(user)) {
      this.following.push(user);
    }
  }

  getFeed() {
    let feed = [];

    for (let user of this.following) {
      for (let post of user.posts) {
        feed.push(post);
      }
    }

    return feed.sort((a, b) => b.likes - a.likes);
  }
}

// Application Setup
const user1 = new User("user1");
const user2 = new User("user2");
const user3 = new User("user3");
const user4 = new User("user4");

user1.post("Hello world!");
user1.post("This is a long post with lots of content...");
user2.post("I'm having a great day!");
user3.post("Check out this cool picture!");
user4.post("Coding is fun!");

user2.likePost(user1.posts[0]);
user3.likePost(user1.posts[0]);
user4.likePost(user2.posts[0]);

user1.follow(user2);
user1.follow(user3);
user2.follow(user1);
user3.follow(user1);
user3.follow(user2);

// Print User Feed
console.log(user1.getFeed());
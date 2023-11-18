/*
   Filename: ComplexApp.js
   Description: This code demonstrates a complex application written in JavaScript. It simulates a social media platform with multiple functionalities like user registration, login, posting, following/unfollowing users, etc.
*/

// User class representing a user of the social media platform
class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.followers = [];
    this.following = [];
    this.posts = [];
  }

  register() {
    // Perform user registration logic here
    console.log(`User with username ${this.username} registered successfully!`);
  }

  login() {
    // Perform user login logic here
    console.log(`User with username ${this.username} logged in successfully!`);
  }

  logout() {
    // Perform user logout logic here
    console.log(`User with username ${this.username} logged out successfully!`);
  }

  post(text) {
    // Create and post a new message here
    const post = new Post(this.username, text);
    this.posts.push(post);
    console.log(`User ${this.username} posted: "${text}"`);
  }

  follow(user) {
    // Follow another user here
    this.following.push(user.username);
    user.followers.push(this.username);
    console.log(`${this.username} started following ${user.username}`);
  }

  unfollow(user) {
    // Unfollow another user here
    const index = this.following.indexOf(user.username);
    if (index > -1) {
      this.following.splice(index, 1);
      const followerIndex = user.followers.indexOf(this.username);
      if (followerIndex > -1) {
        user.followers.splice(followerIndex, 1);
      }
      console.log(`${this.username} unfollowed ${user.username}`);
    } else {
      console.log(`${this.username} is not following ${user.username}`);
    }
  }
}

// Post class representing a post on the social media platform
class Post {
  constructor(author, text) {
    this.author = author;
    this.text = text;
    this.likes = 0;
  }

  like() {
    // Increase the like count of the post
    this.likes++;
    console.log(`Post liked by ${this.author}`);
  }

  dislike() {
    // Decrease the like count of the post
    if (this.likes > 0) {
      this.likes--;
      console.log(`Post disliked by ${this.author}`);
    } else {
      console.log(`Post has no likes to be disliked by ${this.author}`);
    }
  }
}

// Application flow
const user1 = new User("JohnDoe", "john.doe@example.com", "password123");
const user2 = new User("JaneSmith", "jane.smith@example.com", "userpass456");

user1.register();
user2.register();

user1.login();
user2.login();

user1.post("Hello from user1!");
user2.post("Hi there from user2!");

user1.like();
user2.like();
user1.dislike();

user1.follow(user2);
user2.follow(user1);

user1.unfollow(user2);
user2.unfollow(user1);

user1.logout();
user2.logout();
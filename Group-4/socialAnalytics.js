class Post {
  constructor(id, userId, content, timestamp, likes, shares, comments) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.timestamp = timestamp;
    this.likes = likes;
    this.shares = shares;
    this.comments = comments;
  }

  get engagementRate() {
    const totalInteractions = this.likes + this.shares + this.comments.length;
    return totalInteractions / 100;
  }

  static getPostsByHashtag(posts, hashtag) {
    return posts.filter(post => post.content.includes(#${hashtag}));
  }
}

class User {
  constructor(id, username, email, followers, following, posts = []) {
    this.id = id;
    this._username = username;
    this.email = email;
    this.followers = followers;   
    this.following = following;   
    this.posts = posts;          
  }

  get followerRatio() {
    if (this.followers === 0) return 0;
    return this.following / this.followers;
  }

  set username(newName) {
    if (!/^[a-zA-Z0-9_]+$/.test(newName)) {
      throw new Error("Invalid username. Use only letters, numbers, or underscore.");
    }
    this._username = newName;
  }

  get username() {
    return this._username;
  }

  isInfluencer = () => this.followers > 10000;

  addPost(content) {
    const newPost = new Post(
      this.posts.length + 1,
      this.id,
      content,
      new Date(),
      0,
      0,
      []
    );
    this.posts.push(newPost);
    return newPost;
  }
}

// ---------------- TEST CASES ----------------

const user1 = new User(1, "john_doe", "john@example.com", 15000, 500);

console.log(user1.isInfluencer()); // true
console.log(user1.followerRatio);  // 0.033...

const post1 = new Post(1, 1, "Great day! #sunny #happy", Date.now(), 100, 20, [
  "Nice!",
  "Awesome",
]);
console.log(post1.engagementRate > 0); // true

try {
  user1.username = "invalid-name!";
} catch (e) {
  console.log("Username validation working");
}

const firstPost = user1.addPost("Hello World! #FirstPost");
console.log(user1.posts.length); // 1
console.log(firstPost.content.includes("#FirstPost")); // true
console.log(firstPost.timestamp > 0); // true

const posts = [
  new Post(1, 1, "Loving this #sunny day", Date.now(), 10, 2, []),
  new Post(2, 1, "Workout time #fitness", Date.now(), 20, 5, []),
  new Post(3, 1, "Chilling #sunny vibes", Date.now(), 15, 3, []),
];
console.log(Post.getPostsByHashtag(posts, "sunny").length); // 2
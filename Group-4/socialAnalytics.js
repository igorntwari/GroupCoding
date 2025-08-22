// ------------------ Step 1: Post Class ------------------
class Post {
  constructor(id, userId, content, timestamp, likes, shares, comments) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.timestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
    this.likes = likes;
    this.shares = shares;
    this.comments = comments || [];
  }

  get engagementRate() {
    const totalInteractions = this.likes + this.shares + this.comments.length;
    return totalInteractions / 100;
  }

  static getPostsByHashtag(posts, hashtag) {
    return posts.filter((post) => post.content.includes(`#${hashtag}`));
  }

  static calculateViralityScore(post) {
    return post.shares * 3 + (post.comments.length || 0) * 2 + post.likes;
  }

  static findTrendingHashtags(posts) {
    const hashtagMap = new Map();
    posts.forEach((post) => {
      const hashtags = post.content.match(/#\w+/g);
      if (hashtags) {
        hashtags.forEach((tag) => {
          hashtagMap.set(tag, (hashtagMap.get(tag) || 0) + 1);
        });
      }
    });
    return Array.from(hashtagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);
  }
}

// ------------------ Step 2: User Class ------------------
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
      throw new Error(
        "Invalid username. Use only letters, numbers, or underscore."
      );
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

  static getUserGrowthRate(user) {
    const growth = user.followers * 0.1;
    return user.followers + growth;
  }

  static compareUsers(user1, user2) {
    const newObj = {};
    Object.assign(
      newObj,
      { ...user1, followerDifference: "Caleb" },
      { ...user2, followerDifference: "Caleb Mevis" }
    );
    return newObj;
  }
}

// ------------------ Step 3: AnalyticsEngine ------------------
class AnalyticsEngine {
  static calculateViralityScore(post) {
    return post.shares * 3 + (post.comments.length || 0) * 2 + post.likes;
  }

  static findTrendingHashtags(posts) {
    const hashtagMap = new Map();
    posts.forEach((post) => {
      const hashtags = post.content.match(/#\w+/g);
      if (hashtags) {
        hashtags.forEach((tag) => {
          hashtagMap.set(tag, (hashtagMap.get(tag) || 0) + 1);
        });
      }
    });
    return Array.from(hashtagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);
  }

  static getUserGrowthRate(user) {
    return user.followers * 1.1;
  }

  static compareUsers(user1, user2) {
    return { ...user1, ...user2 };
  }
}

// ------------------ Step 4-9: SocialPlatform ------------------

// Private Symbols for internal calculations
const _calculateEngagement = Symbol("calculateEngagement");
const _calculateVirality = Symbol("calculateVirality");

class SocialPlatform {
  constructor() {
    this.users = [];
    this.posts = [];
    this.analytics = [];

    this.userConnections = new Map(); // follower -> followees
    this.trendingTopics = new Set();  // unique trending topics
    this["viral_posts"] = [];         // computed property example
  }

  // ---------- User & Post Methods ----------
  addUser(user) {
    this.users.push(user);
  }

  addPost(post) {
    this.posts.push(post);
    const user = this.users.find((u) => u.id === post.userId);
    if (user) user.addPost(post);

    // Update computed property dynamically
    if (post.likes + post.shares + post.comments.length > 100) {
      this["viral_posts"].push(post);
    }
  }

  followUser(followerId, followeeId) {
    if (!this.userConnections.has(followerId)) {
      this.userConnections.set(followerId, []);
    }
    const followees = this.userConnections.get(followerId);
    if (!followees.includes(followeeId)) followees.push(followeeId);
  }

  trackTrendingTopic(topic) {
    this.trendingTopics.add(topic);
  }

  getInfluenceNetwork(userId) {
    const directConnections = this.userConnections.get(userId) || [];
    let reach = new Set(directConnections);

    for (const followeeId of directConnections) {
      const followeeConnections = this.userConnections.get(followeeId) || [];
      followeeConnections.forEach((id) => reach.add(id));
    }

    return { connections: directConnections, reach: reach.size };
  }

  // ---------- Async Methods ----------
  async batchProcessPosts(posts) {
    let processedCount = 0;
    for (const post of posts) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      this.addPost(post);
      processedCount++;
    }
    return { processedCount, success: true };
  }

  async generateInfluencerReport(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    await new Promise((resolve) => setTimeout(resolve, 50));

    const userPosts = this.posts.filter((p) => p.userId === userId);
    const engagement = userPosts.reduce(
      (sum, p) => sum + this[_calculateEngagement](p),
      0
    );
    const reach = user.followers;

    return { user: user.username, engagement, reach, posts: userPosts.length };
  }

  async performDailyAnalytics() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const stats = this.getEngagementStats();
    const topInfluencers = this.getTopInfluencers(5);
    const topPosts = [...this.posts]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5);

    return { stats, topInfluencers, topPosts, generatedAt: new Date() };
  }

  async moderateContent(posts) {
    const bannedWords = ["spam", "fake", "scam"];
    const approved = [];
    const rejected = [];

    for (const post of posts) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      const isBanned = bannedWords.some((word) =>
        post.content.toLowerCase().includes(word)
      );
      if (isBanned) rejected.push(post);
      else approved.push(post);
    }

    return { approved, rejected };
  }


  [_calculateEngagement](post) {
    return post.likes + post.shares + post.comments.length;
  }

  [_calculateVirality](post) {
    return post.shares * 3 + post.comments.length * 2 + post.likes;
  }


  getEngagementStats() {
    const totalUsers = this.users.length;
    const avgFollowers =
      this.users.reduce((sum, u) => sum + u.followers, 0) / (totalUsers || 1);
    const totalEngagements = this.posts.reduce(
      (sum, post) => sum + this[_calculateEngagement](post),
      0
    );
    return { totalUsers, avgFollowers, totalEngagements };
  }

  getTopInfluencers(limit = 10) {
    return [...this.users]
      .sort((a, b) => b.followers - a.followers)
      .slice(0, limit);
  }

 
  [Symbol.iterator]() {
    let index = 0;
    const posts = this.posts;
    return {
      next() {
        if (index < posts.length) {
          return { value: posts[index++], done: false };
        } else return { done: true };
      },
    };
  }

  
  ["analyzeByEngagement"]() {
    const total = this.posts.reduce(
      (sum, post) => sum + this[_calculateEngagement](post),
      0
    );
    const avg = total / (this.posts.length || 1);
    return { totalEngagement: total, averageEngagement: avg };
  }
}


const platform = new SocialPlatform();


const user1 = new User(1, "Alice", "alice@mail.com", 1200, 300);
const user2 = new User(2, "Bob", "bob@mail.com", 800, 150);
const user3 = new User(3, "Charlie", "charlie@mail.com", 1500, 500);

platform.addUser(user1);
platform.addUser(user2);
platform.addUser(user3);


const posts = [
  new Post(1, 1, "Post 1 #fun", Date.now(), 100, 20, []),
  new Post(2, 2, "Post 2 #fun #news", Date.now(), 200, 40, []),
  new Post(3, 3, "Post 3 #news", Date.now(), 150, 30, []),
];

posts.forEach((post) => platform.addPost(post));


let count = 0;
let totalLikes = 0;
for (let post of platform) {
  count++;
  totalLikes += post.likes;
}
console.log("Iterator test: ", count, totalLikes); 


const analyticsType = "Engagement";
const dynamicMethod = "analyzeBy" + analyticsType;
if (typeof platform[dynamicMethod] === "function") {
  const analysis = platform[dynamicMethod]();
  console.log("Dynamic method test:", analysis.hasOwnProperty("averageEngagement")); // true
}


const symbols = Object.getOwnPropertySymbols(platform);
console.log("Symbol test:", symbols.length > 0);


const metricName = "viral_posts";
const computedResult = platform[metricName];
console.log("Computed property test:", computedResult !== undefined);


console.log("Engagement Stats:", platform.getEngagementStats());


console.log(
  "Top Influencers:",
  platform.getTopInfluencers().map((u) => u.username)
);

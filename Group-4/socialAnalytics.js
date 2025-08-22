
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
    const { shares, comments, likes } = post;
    return shares * 3 + (comments.length || 0) * 2 + likes * 1;
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

  // simulate growth
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


class AnalyticsEngine {
  static calculateViralityScore(post) {
    const { shares, comments, likes } = post;
    return shares * 3 + (comments.length || 0) * 2 + likes * 1;
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

  static getUserGrowthRate(user, timeframe) {
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

// --- Step 3 & Step 4 & Step 5: SocialPlatform ---
class SocialPlatform {
  constructor(users, posts, analytics) {
    this.users = [];
    this.posts = [];
    this.analytics = [];
  }

  addUsers(user) {
    this.users.push(user);
  }

  addPosts(post) {
    this.posts.push(post);
    const user = this.users.find((u) => u.id === post.userId);
    if (user) user.addPost(post.content);
  }

  getTopInfluencers(limit = 10) {
    return [...this.users]
      .sort((a, b) => b.followers - a.followers)
      .slice(0, limit);
  }

  getEngangmentStats() {
    let totalUsers = this.users.length;
    let avgFollowers =
      this.users.reduce((sum, user) => sum + user.followers, 0) /
      (totalUsers || 1);
    let totalEngangments = this.posts.reduce(
      (sum, post) => sum + post.engagementRate,
      0
    );
    return { totalUsers, avgFollowers, totalEngangments };
  }

  finPostsByTimeframe(startTime, endTime) {
    return this.posts.filter(
      (post) => post.timestamp >= startTime && post.timestamp <= endTime
    );
  }

  // --- Step 4 ---
  processUserData({ users, filters = {}, options = {} }) {
    return users.filter(
      (user) => !filters.minFollowers || user.followers >= filters.minFollowers
    );
  }

  mergePlatformData(...platforms) {
    const merged = new SocialPlatform();
    platforms.forEach((platform) => {
      merged.users.push(...platform.users);
      merged.posts.push(...platform.posts);
    });
    return merged;
  }

  createUserProfile(user) {
    const { id, username, email, followers, following, posts } = user;
    return {
      id,
      username,
      email,
      followers,
      following,
      posts,
      socialScore: followers * 0.1,
    };
  }

  updatePostMetrics(postId, metrics) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) Object.assign(post, { ...metrics });
  }

  // --- Step 5: Default Parameters & Enhanced Objects ---
  generateReport(
    timeframe = "week",
    metrics = ["engagement", "growth"],
    format = "summary"
  ) {
    const key = `report_${timeframe}`;
    return {
      timeframe,
      metrics,
      format,
      [key]: true,
    };
  }

  createCampaign(name, budget = 1000, ...targetHashtags) {
    return {
      name,
      budget,
      hashtags: targetHashtags,
    };
  }

  schedulePost(content, delay = 0, options = {}) {
    return {
      content,
      delay,
      options,
    };
  }
}



const user1 = new User(1, "john_doe", "john@example.com", 15000, 500);
console.log(user1.isInfluencer()); 
console.log(user1.followerRatio); 

const post = new Post(1, 1, "Great day! #sunny #happy", Date.now(), 100, 20, [
  "Nice!",
  "Awesome",
]);
console.log(post.engagementRate > 0); 

try {
  user1.username = "invalid-name!";
} catch (error) {
  console.log("Username validation working"); 
}

const firstPost = user1.addPost("Hello World! #FirstPost");
console.log(user1.posts.length); // 1
console.log(firstPost.content.includes("#FirstPost")); 

const posts = [
  new Post(1, 1, "Loving this #sunny day", Date.now(), 10, 2, []),
  new Post(2, 1, "Workout time #fitness", Date.now(), 20, 5, []),
  new Post(3, 1, "Chilling #sunny vibes", Date.now(), 15, 3, []),
];
console.log(Post.getPostsByHashtag(posts, "sunny").length); // 2
console.log(Post.findTrendingHashtags(posts)); 

const post1 = new Post(1, 1, "Viral content #trending", new Date(), 1000, 500, []);
const post2 = new Post(2, 1, "Normal post #daily", new Date(), 10, 2, []);
console.log(
  AnalyticsEngine.calculateViralityScore(post1) >
    AnalyticsEngine.calculateViralityScore(post2)
); 
console.log(Array.isArray(AnalyticsEngine.findTrendingHashtags([post1, post2]))); // true

// --- SocialPlatform Tests ---
const platform = new SocialPlatform();
const user = new User(1, "testuser", "test@test.com", 1000, 500);
platform.addUsers(user);

const processed = platform.processUserData({
  users: [user],
  filters: { minFollowers: 500 },
});
console.log(Array.isArray(processed));

const profile = platform.createUserProfile(user);
console.log(profile.username); 
console.log(profile.hasOwnProperty("socialScore")); 

const postTest = new Post(1, 1, "Test", Date.now(), 10, 5, []);
platform.addPosts(postTest);
platform.updatePostMetrics(1, { likes: 50, shares: 15 });
const updatedPost = platform.posts.find((p) => p.id === 1);
console.log(updatedPost.likes); // 50

// --- Step 5 Tests ---
const report = platform.generateReport();
console.log(report.hasOwnProperty("timeframe")); 
console.log(report.timeframe); 

const campaign = platform.createCampaign("Summer Sale", 5000, "summer", "sale", "discount");
console.log(campaign.name); 
console.log(campaign.budget); 
console.log(campaign.hashtags.length); 

const scheduled = platform.schedulePost("Scheduled content");
console.log(scheduled.delay); 
console.log(scheduled.hasOwnProperty("content")); 


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
console.log(Post.findTrendingHashtags(posts)); // ['#sunny', '#fitness']

const user2 = new User(2, "user2", "user2@test.com", 500, 200);
console.log(User.getUserGrowthRate(user1)); // simulate growth
console.log(User.compareUsers(user1, user2));

// STEP 2
class  AnalyticsEngine{

      static calculateViralityScore(post){
        const {shares, comments, likes} = post;
        return (shares*3)+(comments.length || 0)*2+(likes *1);
            }
      static findTrendingHashtags(posts){
        const hashtagMap = new Map();
        posts.forEach(post => {
          const hashtags = post.content.match(/#\w+/g);
          if(hashtags){
            hashtags.forEach(tag => {
              hashtagMap.set(tag, (hashtagMap.get(tag) || 0) + 1);
            });
          }
        });
        return Array.from(hashtagMap.entries())
          .sort((a, b) => b[1] - a[1])
          .map(entry => entry[0]);
      }
      static getUserGrowthRate(user, timeframe){
        // Simulate growth rate calculation
        const growth = user.followers * 0.1; // 10% growth
        return user.followers + growth;

      }
      static compareUsers(user1, user2){
     
        const newObj = {}
         
         Object.assign(newObj, {...user1,followerDifference :"Caleb"},{...user2,followerDifference :"Caleb Mevis"});
         return newObj;
      }
    } 
    const post1 = new Post(
  1,
  1,
  "Viral content #trending",
  new Date(),
  1000,
  5000,
  []
);
// console.log(Post);

// TESTING RESULT

const post2 = new Post(2, 1, "Normal post #daily", new Date(), 10, 2, []);

const virality = AnalyticsEngine.calculateViralityScore(post1);
console.log(virality > AnalyticsEngine.calculateViralityScore(post2)); // Expected: true

const trending = AnalyticsEngine.findTrendingHashtags([post1, post2]);
console.log(Array.isArray(trending)); // Expected: true
console.log(trending.lenght >= 2); // Expected: true

console.log(AnalyticsEngine.getUserGrowthRate(user1)); // simulate growth
console.log(AnalyticsEngine.compareUsers(user1, user2));


// --- Step 3 & Step 4 & Step 5: SocialPlatform ---
class SocialPlatform {
  constructor(users, posts, analytics) {
    this.users = [];
    this.posts = [];
    this.analytics = [];

    // Step 8: Advanced Analytics
    this.userConnections = new Map(); // Map<userId, array of followeeIds>
    this.trendingTopics = new Set();  // Set of unique trending topics
  }

  addUser(user) {
    this.users.push(user);
  }

  addPost(post) {
    this.posts.push(post);
    const user = this.users.find((u) => u.id === post.userId);
    if (user) user.addPost(post);
  }

  getTopInfluencers(limit = 10) {
    return [...this.users]
      .sort((a, b) => b.followers - a.followers)
      .slice(0, limit);
  }

  getEngagementStats() {
    let totalUsers = this.users.length;
    let avgFollowers =
      this.users.reduce((sum, user) => sum + user.followers, 0) /
      (totalUsers || 1);
    let totalEngagements = this.posts.reduce(
      (sum, post) => sum + post.engagementRate,
      0
    );
    return { totalUsers, avgFollowers, totalEngagements };
  }

  findPostsByTimeframe(startTime, endTime) {
    return this.posts.filter(
      (post) => post.timestamp >= startTime && post.timestamp <= endTime
    );
  }

  // ---------------- Map & Set Methods ----------------

  followUser(followerId, followeeId) {
    if (!this.userConnections.has(followerId)) {
      this.userConnections.set(followerId, []);
    }
    const followees = this.userConnections.get(followerId);
    if (!followees.includes(followeeId)) {
      followees.push(followeeId);
    }
  }

  trackTrendingTopic(topic) {
    this.trendingTopics.add(topic);
  }

  getInfluenceNetwork(userId) {
    const directConnections = this.userConnections.get(userId) || [];
    let reach = new Set(directConnections); // immediate reach

    // Include followers of followers for extended reach
    for (const followeeId of directConnections) {
      const followeeConnections = this.userConnections.get(followeeId) || [];
      followeeConnections.forEach((id) => reach.add(id));
    }

    return {
      connections: directConnections,
      reach: reach.size
    };
  }

  // ---------------- Async Methods from previous steps ----------------
  async batchProcessPosts(posts) {
    try {
      let processedCount = 0;
      for (const post of posts) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        this.addPost(post);
        processedCount++;
      }
      return { processedCount, success: true };
    } catch (error) {
      console.error("Error in batchProcessPosts:", error.message);
      throw new Error("Failed to batch process posts");
    }
  }

  async generateInfluencerReport(userId) {
    try {
      const user = this.users.find((u) => u.id === userId);
      if (!user) throw new Error("User not found");

      await new Promise((resolve) => setTimeout(resolve, 50));

      const userPosts = this.posts.filter((p) => p.userId === userId);
      const engagement = userPosts.reduce(
        (sum, p) => sum + p.engagementRate,
        0
      );
      const reach = user.followers;

      return { user: user.username, engagement, reach, posts: userPosts.length };
    } catch (error) {
      console.error("Error in generateInfluencerReport:", error.message);
      throw new Error("Failed to generate influencer report");
    }
  }

  async performDailyAnalytics() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const stats = this.getEngagementStats();
      const topInfluencers = this.getTopInfluencers(5);
      const topPosts = [...this.posts]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 5);

      return { stats, topInfluencers, topPosts, generatedAt: new Date() };
    } catch (error) {
      console.error("Error in performDailyAnalytics:", error.message);
      throw new Error("Failed to perform daily analytics");
    }
  }

  async moderateContent(posts) {
    try {
      const bannedWords = ["spam", "fake", "scam"];
      const approved = [];
      const rejected = [];

      for (const post of posts) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        const isBanned = bannedWords.some((word) =>
          post.content.toLowerCase().includes(word)
        );
        if (isBanned) {
          rejected.push(post);
        } else {
          approved.push(post);
        }
      }

      return { approved, rejected };
    } catch (error) {
      console.error("Error in moderateContent:", error.message);
      throw new Error("Content moderation failed");
    }
  }
}



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
   // STEP 6 CALEB
  fetchUserData(userId){
    return new Promise((resolve,reject)=>{
      const user = this.users.find(u=>u.id===userId);
      if(user){
        resolve(user);
      }else{
        reject("No user found now");
      }
    });
  }
  publishPost(post){
    return new Promise((resolve,reject)=>{
      const user = this.users.find(u=>u.id===post.userId);
      if(user){
        user.addPost(post);
        this.posts.push(post);
        resolve(post);
      }else{
        reject(new Error("No user found"));
      }
    });
  }
  getAnalyticsData(timeframe){
    return new Promise((resolve,reject)=>{
      const data = {
        userGrowth: AnalyticsEngine.getUserGrowthRate(this.users[0], timeframe),
        postVirality: AnalyticsEngine.calculateViralityScore(this.posts[0])
      };
      resolve(data);
    });
  }
  syncWithExternalAPI(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        const success = true; // Simulate success or failure
        if(success){
          resolve("The API promise resolved");
        }else{
          reject(new Error("Failed to fetch"));
        }
      },1000);
    });
  }

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





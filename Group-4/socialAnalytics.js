
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
async fetchUserData(userId) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return { id: userId, username: `user_${userId}` };
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

module.exports = {
  Post,
  User,
  AnalyticsEngine,
  SocialPlatform
};


SocialPlatform.prototype.analyzeByEngagement = function () {
  const total =
    this.posts.reduce(
      (s, p) => s + p.likes + p.shares + (p.comments ? p.comments.length : 0),
      0
    ) || 0;
  const averageEngagement = this.posts.length ? total / this.posts.length : 0;
  return { totalEngagement: total, averageEngagement };
};

SocialPlatform.prototype.analyzeByVirality = function (threshold = 100) {
  const scored = this.posts.map((p) => ({
    post: p,
    score: AnalyticsEngine.calculateViralityScore(p),
  }));
  const viralPosts = scored.filter((x) => x.score >= threshold).map((x) => x.post);
  return { viralPosts, threshold };
};

SocialPlatform.prototype.generateReport = function (
  timeframe = "week",
  metrics = ["engagement", "growth"],
  format = "summary"
) {
  const data = {
    timeframe,
    metrics,
    format,
    totals: {
      users: this.users.length,
      posts: this.posts.length,
    },
  };
  return data;
};


SocialPlatform.prototype.createCampaign = function (name, budget = 1000, ...targetHashtags) {
  const hashtags = targetHashtags.map((h) => (h.startsWith("#") ? h : `#${h}`));
  const id = Math.floor(Math.random() * 1e6);
  const key = `campaign_${id}`;
  // enhanced object literal + computed property name
  return {
    id,
    name,
    budget,
    hashtags,
    [key]: true,
  };
};


SocialPlatform.prototype.schedulePost = function (content, delay = 0, options = {}) {
  return {
    content,
    delay,
    options: { ...options },
    scheduledAt: Date.now(),
  };
};



const runSocialMediaAnalytics = async () => {
  console.log("=== Social Media Analytics Platform Demo ===");

  const platform = new SocialPlatform();

  // Create diverse user base
  const users = [
    new User(1, "tech_guru", "guru@tech.com", 100000, 5000),
    new User(2, "lifestyle_blogger", "blogger@life.com", 75000, 3000),
    new User(3, "news_reporter", "news@media.com", 200000, 1000),
    new User(4, "regular_user", "user@email.com", 500, 200),
    new User(5, "rising_star", "star@social.com", 25000, 8000),
  ];

  // Add users to platform
  users.forEach((user) => platform.addUser(user));

  // Create sample posts with various engagement levels
  const samplePosts = [
    new Post(
      1,
      1,
      "Breaking: New AI breakthrough! #AI #Technology #Innovation",
      Date.now() - 3600000,
      5000,
      1200,
      ["Amazing!", "Revolutionary", "Can't wait to try it"]
    ),
    new Post(
      2,
      2,
      "My morning routine for productivity ☀️ #Lifestyle #Productivity #MorningRoutine",
      Date.now() - 7200000,
      2500,
      800,
      ["So helpful", "Trying this tomorrow"]
    ),
    new Post(
      3,
      3,
      "BREAKING: Major policy changes announced #News #Politics #Update",
      Date.now() - 1800000,
      8000,
      2000,
      ["Important update", "Thanks for reporting"]
    ),
    new Post(
      4,
      4,
      "Just had a great coffee ☕ #Coffee #Monday",
      Date.now() - 900000,
      15,
      2,
      ["Nice!"]
    ),
    new Post(
      5,
      5,
      "New music video dropping soon! 🎵 #Music #ComingSoon #Excited",
      Date.now() - 300000,
      12000,
      3500,
      ["Can't wait!", "Your best work yet!"]
    ),
  ];

  samplePosts.forEach((post) => platform.addPost(post));
  console.log(
    `✓ Platform initialized with ${users.length} users and ${samplePosts.length} posts`
  );

  // Test basic analytics
  const topInfluencers = platform.getTopInfluencers(3);
  console.log(
    `✓ Top 3 influencers identified: ${topInfluencers
      .map((u) => u.username)
      .join(", ")}`
  );

  const engagementStats = platform.getEngagementStats();
  console.log(
    `✓ Platform engagement stats: ${engagementStats.totalEngagements} total engagements`
  );

  // Test static analytics methods
  const viralPosts = samplePosts.filter(
    (post) => AnalyticsEngine.calculateViralityScore(post) > 0.8
  );
  console.log(`✓ Found ${viralPosts.length} viral posts`);

  const trendingHashtags = AnalyticsEngine.findTrendingHashtags(samplePosts);
  console.log(
    `✓ Trending hashtags: ${trendingHashtags
      .slice(0, 3)
      .map((h) => h.tag)
      .join(", ")}`
  );

  // Test async operations
  console.log("\n=== Testing Async Operations ===");

  try {
    // Fetch external user data
    const userData = await platform.fetchUserData(999);
    console.log(`✓ Fetched external user data for user ${userData.id}`);

    // Generate influencer report
    const influencerReport = await platform.generateInfluencerReport(1);
    console.log(
      `✓ Generated influencer report with ${influencerReport.engagement.totalPosts} posts analyzed`
    );

    // Perform daily analytics
    const dailyAnalytics = await platform.performDailyAnalytics();
    console.log(
      `✓ Daily analytics completed: ${dailyAnalytics.topPosts.length} top posts identified`
    );

    // Batch process posts
    const batchResult = await platform.batchProcessPosts(samplePosts);
    console.log(`✓ Batch processed ${batchResult.processedCount} posts`);

    // Content moderation
    const moderationResult = await platform.moderateContent(samplePosts);
    console.log(
      `✓ Content moderation: ${moderationResult.approved.length} approved, ${moderationResult.flagged.length} flagged`
    );
  } catch (error) {
    console.log(`✗ Async operation failed: ${error.message}`);
  }

  // Test Map/Set operations
  console.log("\n=== Testing Social Network Features ===");

  // Create follow relationships
  platform.followUser(4, 1); // regular_user follows tech_guru
  platform.followUser(4, 2); // regular_user follows lifestyle_blogger
  platform.followUser(5, 1); // rising_star follows tech_guru
  platform.followUser(1, 3); // tech_guru follows news_reporter

  console.log(
    `✓ Created ${platform.userConnections.size} user connection mappings`
  );

  // Track trending topics
  platform.trackTrendingTopic("AI");
  platform.trackTrendingTopic("Technology");
  platform.trackTrendingTopic("Lifestyle");
  platform.trackTrendingTopic("Music");
  platform.trackTrendingTopic("News");

  console.log(`✓ Tracking ${platform.trendingTopics.size} trending topics`);

  const influenceNetwork = platform.getInfluenceNetwork(1);
  console.log(
    `✓ Tech guru's influence network: ${influenceNetwork.connections.length} connections, reach: ${influenceNetwork.reach}`
  );

  // Test iteration protocol
  console.log("\n=== Testing Data Processing ===");

  let totalEngagements = 0;
  let postsProcessed = 0;

// ITERATING IN PLATFORM

  for (let post in platform.posts) {
    postsProcessed++;
    totalEngagements += platform.posts[post].likes + platform.posts[post].shares + platform.posts[post].comments.length;
  }

  console.log(`✓ Processed ${postsProcessed} posts via iteration`);
  console.log(`✓ Total platform engagements: ${totalEngagements}`);

  // Test dynamic analytics methods
  const engagementAnalysis = platform.analyzeByEngagement();
  console.log(
    `✓ Engagement analysis: average ${engagementAnalysis.averageEngagement.toFixed(
      2
    )} per post`
  );

  const viralAnalysis = platform.analyzeByVirality();
  console.log(
    `✓ Virality analysis: ${viralAnalysis.viralPosts.length} posts above viral threshold`
  );

  // Test report generation
  const weeklyReport = platform.generateReport("week", [
    "engagement",
    "growth",
    "virality",
  ]);
  console.log(
    `✓ Generated weekly report covering ${weeklyReport.metrics.length} metrics`
  );

  // Test campaign creation
  const campaign = platform.createCampaign(
    "Tech Innovation Campaign",
    10000,
    "AI",
    "Technology",
    "Innovation",
    "Future"
  );
  console.log(
    `✓ Created campaign "${campaign.name}" with ${campaign.hashtags.length} target hashtags`
  );

  // Test user comparison
  const comparison = AnalyticsEngine.compareUsers(users[0], users[1]);
  console.log(
    `✓ User comparison: ${comparison.winner} has ${comparison.followerDifference} more followers`
  );

  // Test post scheduling
  const scheduledPost = platform.schedulePost(
    "Automated analytics report 📊 #Analytics #Data",
    3600,
    { priority: "high" }
  );
  console.log(`✓ Scheduled post with ${scheduledPost.delay}s delay`);

  // Final platform statistics
  console.log("\n=== Final Platform Statistics ===");
  console.log(`Total Users: ${platform.users.length}`);
  console.log(`Total Posts: ${platform.posts.length}`);
  console.log(
    `Total Connections: ${
      Array.from(platform.userConnections.values()).flat().length
    }`
  );
  console.log(
    `Trending Topics: ${Array.from(platform.trendingTopics).join(", ")}`
  );

  const platformEngagement = platform.posts.reduce(
    (sum, post) => sum + post.likes + post.shares + post.comments.length,
    0
  );
  console.log(`Total Platform Engagement: ${platformEngagement}`);

  const avgViralityScore =
    platform.posts.reduce(
      (sum, post) => sum + AnalyticsEngine.calculateViralityScore(post),
      0
    ) / platform.posts.length;
  console.log(`Average Virality Score: ${avgViralityScore.toFixed(3)}`);

  console.log("\n=== Social Media Analytics Demo Complete ===");
  console.log(
    "All ES6 features and social media functionality successfully demonstrated!"
  );
};

// Run the complete demonstration
runSocialMediaAnalytics();

// Exports (uncomment when using as module)
// module.exports = { Post, User, AnalyticsEngine, SocialPlatform };


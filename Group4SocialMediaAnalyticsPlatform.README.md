# Group 4: Social Media Analytics Platform Challenge

## Overview

Build a comprehensive social media analytics platform that tracks posts, users, engagement metrics, and generates insights using ES6 features. You'll work with data processing, real-time analytics, and trend analysis.

## Setup

1. Create a file called `socialAnalytics.js`
2. All your code should be written in this file
3. Run tests using: `node socialAnalytics.js`

## Steps

### Step 0: Post and User Foundation

**Objective**: Create basic social media entities

**Requirements**:

- Create `Post` class with properties: id, userId, content, timestamp, likes, shares, comments
- Create `User` class with properties: id, username, email, followers, following, posts array
- Add method `addPost(content)` to User class
- Use Date.now() for timestamps and template literals for string formatting

**Test Case**:

```javascript
const user = new User(1, "john_doe", "john@example.com");
const post = new Post(1, 1, "Hello World! #FirstPost", Date.now(), 0, 0, []);

user.addPost(post);
console.log(user.posts.length); // Expected: 1
console.log(post.content.includes("#FirstPost")); // Expected: true
console.log(post.timestamp > 0); // Expected: true
```

### Step 1: Enhanced Entities with Getters/Setters

**Objective**: Add computed properties and validation

**Requirements**:

- Add getter `engagementRate` to Post (calculated from likes, shares, comments)
- Add getter `followerRatio` to User (following/followers ratio)
- Add setter for User `username` with validation (alphanumeric + underscore only)
- Add method `isInfluencer()` using arrow function (>10k followers)
- Add method `getPostsByHashtag(hashtag)` using filter

**Test Case**:

```javascript
const user = new User(1, "john_doe", "john@example.com", 15000, 500);
console.log(user.isInfluencer()); // Expected: true
console.log(user.followerRatio); // Expected: 0.033...

const post = new Post(1, 1, "Great day! #sunny #happy", Date.now(), 100, 20, [
  "Nice!",
  "Awesome",
]);
console.log(post.engagementRate > 0); // Expected: true

try {
  user.username = "invalid-name!"; // Should throw error
} catch (e) {
  console.log("Username validation working"); // Expected output
}
```

### Step 2: Analytics Engine with Static Methods

**Objective**: Create analytics utilities with static methods

**Requirements**:

- Create `AnalyticsEngine` class with static methods
- Add static method `calculateViralityScore(post)` based on engagement metrics
- Add static method `findTrendingHashtags(posts)` that extracts and ranks hashtags
- Add static method `getUserGrowthRate(user, timeframe)`
- Add static method `compareUsers(user1, user2)` returning comparison object

**Test Case**:

```javascript
const post1 = new Post(
  1,
  1,
  "Viral content #trending",
  Date.now(),
  1000,
  500,
  []
);
const post2 = new Post(2, 1, "Normal post #daily", Date.now(), 10, 2, []);

const virality = AnalyticsEngine.calculateViralityScore(post1);
console.log(virality > AnalyticsEngine.calculateViralityScore(post2)); // Expected: true

const trending = AnalyticsEngine.findTrendingHashtags([post1, post2]);
console.log(Array.isArray(trending)); // Expected: true
console.log(trending.length >= 2); // Expected: true

const user1 = new User(1, "user1", "user1@test.com", 1000, 100);
const user2 = new User(2, "user2", "user2@test.com", 500, 200);
const comparison = AnalyticsEngine.compareUsers(user1, user2);
console.log(comparison.hasOwnProperty("followerDifference")); // Expected: true
```

### Step 3: Social Platform with Advanced Array Methods

**Objective**: Create main platform class with complex data processing

**Requirements**:

- Create `SocialPlatform` class with users, posts, and analytics arrays
- Add method `addUser(user)` and `addPost(post)`
- Add method `getTopInfluencers(limit = 10)` using sort and slice
- Add method `getEngagementStats()` using reduce to calculate platform-wide stats
- Add method `findPostsByTimeframe(startTime, endTime)` using filter

**Test Case**:

```javascript
const platform = new SocialPlatform();
const user1 = new User(1, "influencer1", "inf1@test.com", 50000, 1000);
const user2 = new User(2, "regular_user", "reg@test.com", 500, 200);

platform.addUser(user1);
platform.addUser(user2);

const topInfluencers = platform.getTopInfluencers(1);
console.log(topInfluencers[0].username); // Expected: "influencer1"

const stats = platform.getEngagementStats();
console.log(stats.hasOwnProperty("totalUsers")); // Expected: true
console.log(stats.hasOwnProperty("avgFollowers")); // Expected: true

const post = new Post(1, 1, "Test post", Date.now(), 100, 20, []);
platform.addPost(post);
const recentPosts = platform.findPostsByTimeframe(
  Date.now() - 3600000,
  Date.now()
);
console.log(recentPosts.length); // Expected: 1
```

### Step 4: Destructuring and Spread in Analytics

**Objective**: Implement advanced data processing with modern syntax

**Requirements**:

- Add method `processUserData({users, filters = {}, options = {}})` using destructuring
- Add method `mergePlatformData(...platforms)` using spread operator
- Add method `createUserProfile(user)` that destructures user properties
- Add method `updatePostMetrics(postId, metrics)` using object spread

**Test Case**:

```javascript
const platform = new SocialPlatform();
const user = new User(1, "testuser", "test@test.com", 1000, 500);
platform.addUser(user);

const processed = platform.processUserData({
  users: [user],
  filters: { minFollowers: 500 },
  options: { includeInactive: false },
});
console.log(Array.isArray(processed)); // Expected: true

const profile = platform.createUserProfile(user);
console.log(profile.username); // Expected: "testuser"
console.log(profile.hasOwnProperty("socialScore")); // Expected: true

const post = new Post(1, 1, "Test", Date.now(), 10, 5, []);
platform.addPost(post);
platform.updatePostMetrics(1, { likes: 50, shares: 15 });
const updatedPost = platform.posts.find((p) => p.id === 1);
console.log(updatedPost.likes); // Expected: 50
```

### Step 5: Default Parameters and Enhanced Objects

**Objective**: Use modern parameter handling and object features

**Requirements**:

- Add method `generateReport(timeframe = "week", metrics = ["engagement", "growth"], format = "summary")`
- Add method `createCampaign(name, budget = 1000, ...targetHashtags)` using rest parameters
- Use enhanced object literals with computed property names
- Add method `schedulePost(content, delay = 0, options = {})` with default parameters

**Test Case**:

```javascript
const platform = new SocialPlatform();

const report = platform.generateReport();
console.log(report.hasOwnProperty("timeframe")); // Expected: true
console.log(report.timeframe); // Expected: "week"

const campaign = platform.createCampaign(
  "Summer Sale",
  5000,
  "summer",
  "sale",
  "discount"
);
console.log(campaign.name); // Expected: "Summer Sale"
console.log(campaign.budget); // Expected: 5000
console.log(campaign.hashtags.length); // Expected: 3

const scheduled = platform.schedulePost("Scheduled content");
console.log(scheduled.delay); // Expected: 0
console.log(scheduled.hasOwnProperty("content")); // Expected: true
```

### Step 6: Promises for API Simulation

**Objective**: Implement asynchronous operations with Promises

**Requirements**:

- Add method `fetchUserData(userId)` returning Promise with mock API response
- Add method `publishPost(post)` returning Promise simulating post publication
- Add method `getAnalyticsData(timeframe)` returning Promise with analytics
- Add method `syncWithExternalAPI()` returning Promise with sync status

**Test Case**:

```javascript
const platform = new SocialPlatform();

platform.fetchUserData(123).then((userData) => {
  console.log(userData.hasOwnProperty("id")); // Expected: true
  console.log(userData.hasOwnProperty("stats")); // Expected: true
});

const post = new Post(1, 1, "Test post", Date.now(), 0, 0, []);
platform.publishPost(post).then((result) => {
  console.log(result.success); // Expected: true
  console.log(result.publishedAt > 0); // Expected: true
});

platform.getAnalyticsData("month").then((analytics) => {
  console.log(analytics.hasOwnProperty("impressions")); // Expected: true
  console.log(analytics.hasOwnProperty("reach")); // Expected: true
});

platform.syncWithExternalAPI().then((syncStatus) => {
  console.log(syncStatus.synchronized); // Expected: true
});
```

### Step 7: Async/Await Social Media Operations

**Objective**: Convert to async/await with comprehensive error handling

**Requirements**:

- Add async method `batchProcessPosts(posts)` using multiple await calls
- Add async method `generateInfluencerReport(userId)` with error handling
- Add async method `performDailyAnalytics()` aggregating multiple async operations
- Add async method `moderateContent(posts)` with content filtering

**Test Case**:

```javascript
const platform = new SocialPlatform();

(async () => {
  try {
    const user = new User(1, "testuser", "test@test.com", 10000, 1000);
    const posts = [
      new Post(1, 1, "Post 1 #test", Date.now(), 100, 20, []),
      new Post(2, 1, "Post 2 #viral", Date.now(), 500, 100, []),
    ];

    platform.addUser(user);
    posts.forEach((post) => platform.addPost(post));

    const processed = await platform.batchProcessPosts(posts);
    console.log(processed.processedCount); // Expected: 2

    const report = await platform.generateInfluencerReport(1);
    console.log(report.hasOwnProperty("engagement")); // Expected: true
    console.log(report.hasOwnProperty("reach")); // Expected: true

    const dailyStats = await platform.performDailyAnalytics();
    console.log(dailyStats.hasOwnProperty("topPosts")); // Expected: true

    const moderated = await platform.moderateContent(posts);
    console.log(moderated.approved.length >= 0); // Expected: true
  } catch (error) {
    console.log("Error handled:", error.message);
  }
})();
```

### Step 8: Map and Set for Advanced Social Analytics

**Objective**: Use Map and Set for complex relationship tracking

**Requirements**:

- Add `userConnections` property using Map to track user relationships
- Add `trendingTopics` property using Set for unique trending topics
- Add method `followUser(followerId, followeeId)` using Map operations
- Add method `trackTrendingTopic(topic)` using Set operations
- Add method `getInfluenceNetwork(userId)` analyzing Map relationships

**Test Case**:

```javascript
const platform = new SocialPlatform();

const user1 = new User(1, "user1", "user1@test.com", 1000, 500);
const user2 = new User(2, "user2", "user2@test.com", 2000, 300);
const user3 = new User(3, "user3", "user3@test.com", 500, 800);

platform.addUser(user1);
platform.addUser(user2);
platform.addUser(user3);

platform.followUser(1, 2);
platform.followUser(3, 1);
platform.followUser(2, 3);

console.log(platform.userConnections.has(1)); // Expected: true
console.log(platform.userConnections.get(1).includes(2)); // Expected: true

platform.trackTrendingTopic("AI");
platform.trackTrendingTopic("Technology");
platform.trackTrendingTopic("AI"); // Duplicate should be ignored

console.log(platform.trendingTopics.size); // Expected: 2
console.log(platform.trendingTopics.has("AI")); // Expected: true

const network = platform.getInfluenceNetwork(1);
console.log(network.hasOwnProperty("connections")); // Expected: true
console.log(network.hasOwnProperty("reach")); // Expected: true
```

### Step 9: Symbols and Iterator Protocol

**Objective**: Implement advanced ES6 features for data traversal

**Requirements**:

- Add Symbol properties for internal analytics methods
- Implement iterator protocol for SocialPlatform (iterate through posts)
- Add method using computed property names for dynamic analytics
- Create private calculation methods using Symbols

**Test Case**:

```javascript
const platform = new SocialPlatform();

const posts = [
  new Post(1, 1, "Post 1", Date.now(), 100, 20, []),
  new Post(2, 2, "Post 2", Date.now(), 200, 40, []),
  new Post(3, 3, "Post 3", Date.now(), 150, 30, []),
];

posts.forEach((post) => platform.addPost(post));

// Should be iterable through all posts
let count = 0;
let totalLikes = 0;
for (let post of platform) {
  count++;
  totalLikes += post.likes;
}
console.log(count); // Expected: 3
console.log(totalLikes); // Expected: 450

// Dynamic method creation
const analyticsType = "Engagement";
const dynamicMethod = "analyzeBy" + analyticsType;
if (typeof platform[dynamicMethod] === "function") {
  const analysis = platform[dynamicMethod]();
  console.log(analysis.hasOwnProperty("averageEngagement")); // Expected: true
}

// Test private symbol methods exist
const symbols = Object.getOwnPropertySymbols(platform);
console.log(symbols.length > 0); // Expected: true

// Test computed property access
const metricName = "viral_posts";
const computedResult = platform[metricName];
console.log(computedResult !== undefined); // Expected: true
```

### Step 10: Complete Social Media Analytics Platform

**Objective**: Integrate all features into comprehensive social media system

**Requirements**:

- Add module exports for all classes
- Create real-time social media monitoring simulation
- Add comprehensive content moderation and analytics
- Implement influencer discovery and trend analysis
- Create complete demonstration of all functionality

**Test Case**:

```javascript
// Complete social media analytics demonstration
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

  for (let post of platform) {
    postsProcessed++;
    totalEngagements += post.likes + post.shares + post.comments.length;
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
```

## Completion Checklist

- [ ] Step 0: Post and User foundation
- [ ] Step 1: Enhanced entities with getters/setters
- [ ] Step 2: Analytics engine with static methods
- [ ] Step 3: Social platform with array methods
- [ ] Step 4: Destructuring and spread in analytics
- [ ] Step 5: Default parameters and enhanced objects
- [ ] Step 6: Promises for API simulation
- [ ] Step 7: Async/await social media operations
- [ ] Step 8: Map and Set for advanced analytics
- [ ] Step 9: Symbols and iterator protocol
- [ ] Step 10: Complete social media analytics platform

## Social Media Features Implemented

- User profile management and validation
- Post creation and engagement tracking
- Follower/following relationship management
- Hashtag extraction and trending analysis
- Virality score calculation algorithms
- Influencer identification and ranking
- Real-time analytics and reporting
- Content moderation and filtering
- Campaign management and scheduling
- Network analysis and influence mapping
- Engagement rate calculations
- Growth rate tracking and analysis

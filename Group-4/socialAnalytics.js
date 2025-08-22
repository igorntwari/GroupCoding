
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

  // engagement rate (toy formula)
  get engagementRate() {
    const totalInteractions = this.likes + this.shares + this.comments.length;
    return totalInteractions / 100;
  }

  // find posts with hashtag
  static getPostsByHashtag(posts, hashtag) {
    return posts.filter(post => post.content.includes(`#${hashtag}`));
  }

  // calculate virality
  static calculateViralityScore(post) {
    const { shares, comments, likes } = post;
    return shares * 3 + (comments.length || 0) * 2 + likes * 1;
  }

  // trending hashtags across posts
  static findTrendingHashtags(posts) {
    const hashtagMap = new Map();
    posts.forEach(post => {
      const hashtags = post.content.match(/#\w+/g);
      if (hashtags) {
        hashtags.forEach(tag => {
          hashtagMap.set(tag, (hashtagMap.get(tag) || 0) + 1);
        });
      }
    });
    return Array.from(hashtagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);
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

  // simulate growth
  static getUserGrowthRate(user) {
    const growth = user.followers * 0.1; 
    return user.followers + growth;
  }

  // compare users
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



const user1 = new User(1, "john_doe", "john@example.com", 15000, 500);

console.log(user1.isInfluencer()); // true
console.log(user1.followerRatio);  // 0.033...

const post = new Post(1, 1, "Great day! #sunny #happy", Date.now(), 100, 20, [
  "Nice!",
  "Awesome",
]);
console.log(post.engagementRate > 0); // true

try {
  user1.username = "invalid-name!";
} catch (error) {
  console.log("Username validation working"); // will print
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

class SocialPlatform{
  constructor(users,posts,analytics){
    this.users = [];
    this.posts =[];
    this.analytics =[];
  }
  addUsers(user){
    this.users.push(user);
  }

  addPosts(post){
    this.posts.push(post);
    const user = this.users.find(u=>u.id===post.userId);
    if(user)user.addPost(post);
  }

  getTopInfluencers (limit =10){
    return [...this.users].sort((a,b)=>b.followers-a.followers).slice(0,limit);
  }
  getEngangmentStats(){
    let totalUsers = this.users.length;
    let avgFollowers = this.users.reduce((sum,user)=>sum+user.followers,0)/(totalUsers||1);
    let totalEngangments = this.posts.reduce((sum,post)=>sum+post.engangmentRate,0);
    return{totalUsers,avgFollowers,totalEngangments}
  }
  finPostsByTimeframe(startTime,endTime){
    return this.posts.filter((post)=>post.timestamp>=startTime && post.timestamp<=endTime);
  }
}


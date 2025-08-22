
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
    return posts.filter(post => post.content.includes(`#${hashtag}`));
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

class Post{
     constructor(id, userId, content, timestamp, likes, shares, comments){
       this.id =id;
       this.userId =userId;
       this.content =content;
       this.timestamp =timestamp.getHours();
       this.likes =likes;
       this.shares =shares;
       this.comments =[];
     }
}

class User{
     constructor(id, username, email, followers, following, posts){
       this.id =id;
       this.username =username;
       this.email =email;
       this.followers =followers;
       this.following =following;
       this.posts =[];
     }
}
User.prototype.addPost = function(content){
    return content;
} 
const user = new User(1, "john_doe", "john@example.com", 15000, 500,[200]);
const post  = new Post(1, 1, "Hello World! #FirstPost", new Date(), 0, 0, [])
console.log(post)
console.log(user)
console.log(user.posts.length); // Expected: 1
console.log(post.content.includes("#FirstPost")); // Expected: true
console.log(post.timestamp > 0); // Expected: true


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
        // if(user1 === user2){
        //   return true;
        // }else{
        //   return false;
        // }
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
  500,
  []
);
// console.log(Post);


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

//  Use 'user1' consistently
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
=======
const user1 = new User(1, "user1", "user1@test.com", 1000, 100);
const user2 = new User(2, "user2", "user2@test.com", 500, 200);
const comparison = AnalyticsEngine.compareUsers(user1, user2);
console.log(comparison.hasOwnProperty("followerDifference"));
console.log(AnalyticsEngine.getUserGrowthRate(user,Post.timestamp))

// console.log(post1.content)
      


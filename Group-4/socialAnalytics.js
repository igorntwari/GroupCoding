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

// TESTING RESULT

const post2 = new Post(2, 1, "Normal post #daily", new Date(), 10, 2, []);

const virality = AnalyticsEngine.calculateViralityScore(post1);
console.log(virality > AnalyticsEngine.calculateViralityScore(post2)); // Expected: true

const trending = AnalyticsEngine.findTrendingHashtags([post1, post2]);
console.log(Array.isArray(trending)); // Expected: true
console.log(trending.lenght >= 2); // Expected: true

const user1 = new User(1, "user1", "user1@test.com", 1000, 100);
const user2 = new User(2, "user2", "user2@test.com", 500, 200);
const comparison = AnalyticsEngine.compareUsers(user1, user2);
console.log(comparison.hasOwnProperty("followerDifference"));
console.log(AnalyticsEngine.getUserGrowthRate(user,Post.timestamp))

// console.log(post1.content)
      
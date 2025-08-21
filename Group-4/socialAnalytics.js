class Post{
     constructor(id, userId, content, timestamp, likes, shares, comments){
       this.id =id;
       this.userId =userId;
       this.content =content;
       this.timestamp =timestamp;
       this.likes =likes;
       this.shares =shares;
       this.comments =comments;
     }
}

class User{
     constructor(id, username, email, followers, following, posts){
       this.id =id;
       this.username =username;
       this.email =email;
       this.followers =followers;
       this.following =following;
       this.posts =posts;
     }
}
User.prototype.addPost = function(content){
    return content;
} 
// const user = new User(1, "john_doe", "john@example.com",0,0,[]);
// const post  = new Post(1, 1, "Hello World! #FirstPost", new Date(), 3, 5, [])
// console.log(post);
// console.log(user)

// console.log(user.posts.length); // Expected: 1
// console.log(post.content.includes("#FirstPost")); // Expected: true
// console.log(post.timestamp > 0); // Expected: true



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
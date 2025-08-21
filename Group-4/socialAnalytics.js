class Post{
     constructor(id, userId, content, timestamp, likes, shares, comments){
       this.id =id;
       this.userId =userId;
       this.content =content;
       this.timestamp =timestamp.getHours();
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
const user = new User(1, "john_doe", "john@example.com",0,0,[]);
const post  = new Post(1, 1, "Hello World! #FirstPost", new Date(), 0, 0, [])
console.log(post)

console.log(user.posts.length); // Expected: 1
console.log(post.content.includes("#FirstPost")); // Expected: true
console.log(post.timestamp > 0); // Expected: true
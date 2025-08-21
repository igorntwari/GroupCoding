class Post{
    constructor(id, userId, content, timestamp, likes, shares,comments){
        this.id=id;
        this.userId=userId;
        this.content=content;
        this.timestamp=timestamp;
        this.likes=likes;
        this.shares=shares;
        this.comments=comments;


    }

    toString(){
        return `this post is for ${this.userId} : "${this.content}" at ${new Date(this.timestamp)}`;
    }

}
class User{
    constructor(id, username, email, followers, following, postsarray){
        this.id=id;
        this.username=username;
        this.email=email;
        this.followers=[];
        this.following=[];
        this.posts=[];
        
    }
    addPost(content){
        this.posts.push(content);
        console.log(`${this.username} added a this post of "${this.content}"`);

    }
}

// ---------------- TEST CASES ----------------

const user1 = new User(1, "john_doe", "john@example.com", 15000, 500);

console.log(user1.isInfluencer()); // true
console.log(user1.followerRatio);  // 0.033...

const post1 = new Post(1, 1, "Great day! #sunny #happy", Date.now(), 100, 20, [
  "Nice!",
  "Awesome",
]);
console.log(post1.engagementRate > 0); // true

try {
  user1.username = "invalid-name!";
} catch (e) {
  console.log("Username validation working");
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

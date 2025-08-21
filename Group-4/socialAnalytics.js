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

const user = new User(1, "john_doe", "john@example.com");
const post = new Post(1, 1, "Hello World! #FirstPost", Date.now(), 0, 0, []);

user.addPost(post);
console.log(user.posts.length); // Expected: 1
console.log(post.content.includes("#FirstPost")); // Expected: true
console.log(post.timestamp > 0); // Expected: true
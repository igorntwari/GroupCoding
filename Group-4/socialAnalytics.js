
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
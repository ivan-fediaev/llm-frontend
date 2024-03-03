const posts = [
    {
      topic: "Lorem Ipsum",
      keywords: ["random", "text", "latin", "literature"],
      noOfQuestions: 5,
      difficulty: "easy",
    },
    {
      topic: "Machine Learning",
      keywords: ["random", "text", "latin", "literature"],
      noOfQuestions: 20,
      difficulty: "hard",
    },        
    {
      topic: "Try Catch Loop",
      keywords: ["error", "exception", "try", "catch"],
      noOfQuestions: 15,
      difficulty: "easy",
    },
    {
      topic: "Linear Regression",
      keywords: ["machine learning", "regression", "linear"],
      noOfQuestions: 15,
      difficulty: "easy",
    }
]

function getPosts() {
    return posts;
}

function getPostByTopic(topic) {
    return posts.find((post) => post.topic === topic);
}

function addPost(post) {
    posts.push(post);
}

export { getPosts, getPostByTopic, addPost };
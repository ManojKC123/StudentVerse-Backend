const User = require("../model/user");
const Answer = require("../model/answer");
const Vote = require("../model/vote");
const Post = require("../model/post");
const mongoose = require("mongoose");
const answerSchema = require("../model/answer");
const voteSchema = require("../model/vote");
const { unsubscribe } = require("../routes/vote");

// const url = 'mongodb://localhost:27017/studentverse';
const url =
  "mongodb+srv://dbUser:dbUser@cluster0.wdhxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// //testing answer add
// it("testing answer add to post", async () => {
//   Post.findOne({ _id: "61372f8b2ffe5600048a705c" }, function (err, post) {
//     if (post != null) {
//       post.answer.push({
//         author: "4edd40c86762e0fb12000003",
//         text: "This is a corona test",
//       });
//       post.save().then((up) => {
//         expect(up.body).toEqual("Post Schema test updated");
//       });
//     }
//   });
// });

// //voting test
// it("testing vote add to post", async () => {
//   Post.findOne({ _id: "61372f8b2ffe5600048a705c" }, function (err, post) {
//     if (post != null) {
//       post.votes.push({
//         user: "4edd40c86762e0fb12000003",
//         vote: 1,
//       });
//     }
//   });
// });

// it("testing vote score delete to post", async () => {
//   Post.findOne({ _id: "61384e1579a6db0708ae6183" }, function (err, post) {
//     if (post != null) {
//       post.votes.push({
//         user: "6103cb5f7ca13549d4ba29e8",
//         vote: -1,
//       });
//     }
//   });
// });

// it("testing vote undo to post", async () => {
//   Post.findOne({ _id: "61384f9a79a6db0708ae61bc" }, function (err, post) {
//     if (post != null) {
//       post.votes.push({
//         user: "6103cb5f7ca13549d4ba29e8",
//         vote: 0,
//       });
//     }
//   });
// });

// //testing user add
// describe("User Schema test", () => {
//   it("testing user add", () => {
//     const user = {
//       email: "netest@gmail.com",
//       username: "netest",
//       fname: "prabu",
//       lname: "deva",
//       password: "test",
//       mobile: "1234567890",
//     };
//     return User.create(user).then((u_ret) => {
//       expect(u_ret.username).toEqual("netest");
//     });
//   });
// });

//testing user update
it("testing user update", async () => {
  return User.findOneAndUpdate(
    { _id: Object("61386cb8c0cfe44308f6b585") },
    { $set: { username: "netest1" } }
  ).then((uu) => {
    expect(uu.username).toEqual("netest");
  });
});

// //testing user delete
// it("testing user delete", async () => {
//   const status = await User.deleteOne({ _id: "61077922b9ec91000420dcad" });
//   expect(status.ok).toBe(1);
// });

// //user post add
// describe("Post Schema test", () => {
//   it("testing post add", () => {
//     const post = {
//       author: mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
//       title: "Testing of post",
//       body: "Post Schema test",
//     };
//     return Post.create(post).then((p_ret) => {
//       expect(p_ret.body).toEqual("Post Schema test");
//     });
//   });
// });

// //testing post update
// it("testing post update", async () => {
//   return Post.findOneAndUpdate(
//     { _id: Object("4edd40c86762e0fb12000003") },
//     { $set: { body: "Post Schema test updated" } }
//   ).then((up) => {
//     expect(up.body).toEqual("Post Schema test");
//   });
// });

// //user post delete
// it("testing post delete", async () => {
//   const status = await Post.deleteOne({ _id: "612775f840fca60d285e76ff" });
//   expect(status.ok).toBe(1);
// });

// //comment post add
// describe("Comment Schema test", () => {
//   it("testing comment add", () => {
//     const post = {
//       author: mongoose.Types.ObjectId("4edd40c86762e0fb12000003"),
//       body: "Comment Schema test",
//       title: "Comment Schema test",
//       text: "Comment Schema test",
//     };
//     return Post.create(post).then((p_ret) => {
//       expect(p_ret.body).toEqual("Comment Schema test");
//     });
//   });
// });

// //testing comment update
// it("testing comment update", async () => {
//   return Post.findOneAndUpdate(
//     { _id: Object("61277aaac9f65a40b03edca1") },
//     { $set: { text: "Comment Schema test updated" } }
//   ).then((uc) => {
//     expect(uc.text).toEqual("Comment Schema test");
//   });
// });

// //comment comment delete
// it("testing comment delete", async () => {
//   const status = await Post.deleteOne({ _id: "61277646b4322e22c01da5cd" });
//   expect(status.ok).toBe(1);
// });

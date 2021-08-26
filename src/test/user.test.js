const User = require('../model/user');
const Answer = require('../model/answer');
const Vote = require('../model/vote');
const Post = require('../model/post');
const mongoose = require('mongoose');
const answerSchema = require('../model/answer');
const voteSchema = require('../model/vote');
const { unsubscribe } = require('../routes/vote');

const url = 'mongodb://localhost:27017/studentverse';
// const url =
//   'mongodb+srv://dbUser:dbUser@cluster0.wdhxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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

// //testing user add
// describe('User Schema test', () => {
//   it('testing user add', () => {
//     const user = {
//       email: 'netest1@gmail.com',
//       username: 'netest1',
//       fname: 'prabu',
//       lname: 'deva',
//       password: 'test',
//       mobile: '123456789012',
//     };
//     return User.create(user).then((u_ret) => {
//       expect(u_ret.username).toEqual('netest1');
//     });
//   });
// });

// //testing user delete
//  it('testing user delete', async () => {
//    const status = await User.deleteOne({ _id: '612774205c022a3d10c23dfc' });
//  expect(status.ok).toBe(1);
//  });

// //testing user update
//  it('testing user update', async () => {
//    return User.findOneAndUpdate(
//      { _id: Object('6127519103bb8f44a84c4569') },
//      { $set: { username: 'netest' } }
//    ).then((uu) => {
//      expect(uu.username).toEqual('netest1');
//    });
//  });

// //user post add
// describe('Post Schema test', () => {
//   it('testing post add', () => {
//     const post = {
//       author: mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
//       title: 'Testing of post',
//       body: 'Post Schema test',
//     };
//     return Post.create(post).then((p_ret) => {
//       expect(p_ret.body).toEqual('Post Schema test');
//     });
//   });
// });

// //user post delete
//  it('testing post delete', async () => {
//    const status = await Post.deleteOne({ _id:'612775f840fca60d285e76ff' });
//  expect(status.ok).toBe(1);
//  });

//  //testing post update
//  it('testing post update', async () => {
//    return Post.findOneAndUpdate(
//      { _id: Object('4edd40c86762e0fb12000003') },
//      { $set: { body: 'Post Schema test' } }
//    ).then((up) => {
//      expect(up.body).toEqual('Post Schema test updated');
//    });
//  });

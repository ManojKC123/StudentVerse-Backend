const User = require('../model/user');
const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/studentverse';
const url =
  'mongodb+srv://dbUser:dbUser@cluster0.wdhxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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

//testing user add
describe('User Schema test', () => {
  it('testing user add', () => {
    const user = {
      email: 'netest1@gmail.com',
      username: 'netest1',
      fname: 'prabu',
      lname: 'deva',
      password: 'test',
      mobile: '123456789012',
    };
    return User.create(user).then((u_ret) => {
      expect(u_ret.username).toEqual('netest1');
    });
  });
});

describe('Comment Schema test', () => {
  it('Comment testing', () => {
    const comment = {
      author: 'netest12345@gmail.com',
      createdAt: 'netest12345',
      text: 'prabu',
    };
    return User.create(comment).then((c_ret) => {
      expect(c_ret.text).toEqual('prabhu');
    });
  });
});

//testing user delete
 it('testing user delete', async () => {
 const status = await User.deleteMany();
 expect(status.ok).toBe(1);
 });

//testing user update
 it('testing user update', async () => {
   return User.findOneAndUpdate(
     { _id: Object('6127519103bb8f44a84c4569') },
     { $set: { username: 'netest' } }
   ).then((us) => {
     expect(us.username).toEqual('netest1');
   });
 });

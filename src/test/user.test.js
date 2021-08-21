const User = require('../model/user');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/studentverse';
beforeAll(async () => {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Schema test', () => {
  it('Add user testing', () => {
    const user = {
      email: 'netest@gmail.com',
      username: 'netest',
      fname: 'prabu',
      lname: 'deva',
      password: 'test',
      mobile: '123456789',
    };
    return User.create(user).then((u_ret) => {
      expect(u_ret.username).toEqual('netest');
    });
  });
});

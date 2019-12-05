import moment from 'moment';
import uuid from 'uuid';

class User {
  /* class constructor
     @param {object} data
   */
  constructor() {
    this.users = [];
  }

  /*
    @returns {object} user object
   */
  create(data) {
    const newuser = {
      id: uuid.v4(),
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      username: data.username || '',
      phoneNumber: data.phoneNumber || '',
      email: data.email || '',
      avatar: data.avatar || '',
      password: data.password || '',
      role: data.role || 'user',
      createdDate: moment.now(),
      modifiedDate: moment.now(),
    };
    this.users.push(newuser);
    return newuser;
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  findOne(id) {
    return this.users.find((user) => user.id === id);
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  findOneByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  /* @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }

  /*
     @param {uuid} id
     @param {object} data
   */
  update(id, data) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index].firstname = data.firstname || user.firstname;
    this.users[index].lastname = data.lastname || user.lastname;
    this.users[index].email = data.email || user.email;
    this.users[index].phoneNumber = data.phoneNumber || user.phoneNumber;
    this.users[index].password = data.password || user.password;
    this.users[index].avatar = data.avatar || user.avatar;
    this.users[index].role = data.role || user.role;
    this.users[index].modifiedDate = moment.now();
    return this.users[index];
  }

  /*
    @param {uuid} id
   */
  delete(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return { id, message: 'User record has been deleted' };
  }
}
export default new User();

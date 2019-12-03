import db from '../../db';

class User {
  /*
    @returns {object} user object
   */
  static create() {
    // TO DO
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  static findOne() {
    // TO DO
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  static findOneByEmail() {
    // TO DO
  }

  /* @returns {object} returns all users
   */
  static findAll() {
    // TO DO
  }

  /*
     @param {uuid} id
     @param {object} data
   */
  static update() {
    // TO DO
  }

  /*
    @param {uuid} id
   */
  static delete() {
    // TO DO
  }

  /*
    @create table
  */
  static createTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        username VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL,
        avatar VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        createdOn TIMESTAMP,
        modifiedDate TIMESTAMP
      )`;

    db.query(queryText)
      .then(() => {
        console.log('table created');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*
    drop table
  */
  static dropTable() {
    const queryText = 'DROP TABLE IF EXISTS users';
    db.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new User();

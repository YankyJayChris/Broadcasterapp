import db from '../../db';

class RedFlag {
  /* class constructor
     @param {object} data
   */
  constructor() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      redflags(
        id UUID PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        createdBy VARCHAR(128) references users(id),
        title VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        comment text NOT NULL,
        images text[],
        videos text[],
        createdOn TIMESTAMP,
        modifiedDate TIMESTAMP
      )`;

    db.query(queryText)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /*
    @returns {object} red-flag object
   */
  static create() {
    // TO DO
  }

  /*  @param {uuid} id
      @returns {object} redFlag object
   */
  static findOne() {
    // TO DO
  }

  /*
    @returns {object} returns all redFlags
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
export default new RedFlag();

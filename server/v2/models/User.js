import moment from 'moment';
import uuid from 'uuid';

import db from '../../db';

class User {
  /* class constructor
    @param {object} data
  */
  constructor() {
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
        createdDate TIMESTAMP,
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
    @returns {object} user object
   */
  async create(data) {
    const newuser = {
      id: uuid.v4(),
      firstname: data.firstname || '',
      lastname: data.lastname || '',
      username: data.username || '',
      phoneNumber: data.phoneNumber || '',
      email: data.email || '',
      avatar: data.avatar || '',
      password: data.password || '',
      type: data.type || 'user',
      createdDate: moment(new Date()),
      modifiedDate: moment(new Date()),
    };

    const text = 'INSERT INTO users (id, firstname, lastname, username, phoneNumber, email, avatar, password, type,createdDate, modifiedDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
    const values = [
      newuser.id,
      newuser.firstname,
      newuser.lastname,
      newuser.username,
      newuser.phoneNumber,
      newuser.email,
      newuser.avatar,
      newuser.password,
      newuser.type,
      newuser.createdDate,
      newuser.modifiedDate,
    ];
    try {
      const { rows } = await db.query(text, values);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  async findOne(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  async findOneByEmail(email) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [email]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /* @returns {object} returns all users
   */
  async findAll() {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return { rows, rowCount };
    } catch (error) {
      return error;
    }
  }

  /*
     @param {uuid} id
     @param {object} data
   */
  async update(id, data) {
    const queryString = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = `UPDATE users
      SET firstname=$1,lastname=$2,email=$3,phoneNumber=$4,password=$5,avatar=$6,type=$7,modifiedDate=$8
      WHERE id=$9 returning *`;
    try {
      const { rows } = await db.query(queryString, [id]);
      if (!rows[0]) {
        return { message: 'user not found' };
      }
      const values = [
        data.firstname || rows[0].firstname,
        data.lastname || rows[0].lastname,
        data.email || rows[0].email,
        data.phoneNumber || rows[0].phoneNumber,
        data.password || rows[0].password,
        data.avatar || rows[0].avatar,
        data.type || rows[0].type,
        moment(new Date()),
        id,
      ];
      const response = await db.query(updateOneQuery, values);
      return response.rows[0];
    } catch (err) {
      return err;
    }
  }

  /*
    @param {uuid} id
   */
  async delete(id) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [id]);
      if (!rows[0]) {
        return { message: 'user not found' };
      }
      return { message: 'deleted' };
    } catch (error) {
      return error;
    }
  }

  /*
    drop table
  */
  dropTable() {
    const queryText = 'DROP TABLE IF EXISTS users';
    db.query(queryText)
      .then(() => {
        console.log('table droped');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new User();

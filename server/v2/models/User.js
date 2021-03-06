import moment from 'moment';
import uuid from 'uuid';

import db from '../../db';

class User {
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
      avatar: data.avatar || '/public/avatar/noprofile.png',
      password: data.password || '',
      role: data.role || 'user',
      createdDate: moment(new Date()),
      modifiedDate: moment(new Date()),
    };

    const text = 'INSERT INTO users (id, firstname, lastname, username, phoneNumber, email, avatar, password, role,createdDate, modifiedDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
    const values = [
      newuser.id,
      newuser.firstname,
      newuser.lastname,
      newuser.username,
      newuser.phoneNumber,
      newuser.email,
      newuser.avatar,
      newuser.password,
      newuser.role,
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
    const text = 'SELECT id, firstname, lastname, username, phoneNumber, email, avatar, role,createdDate, modifiedDate FROM users WHERE id = $1';
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

  /*  @param {uuid} id
      @returns {object} user object
   */
  async findOneByUsername(username) {
    const text = 'SELECT * FROM users WHERE username = $1';
    try {
      const { rows } = await db.query(text, [username]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*  @param {uuid} id
      @returns {object} user object
   */
  async findOneByPhonenumber(phone) {
    const text = 'SELECT * FROM users WHERE phoneNumber = $1';
    try {
      const { rows } = await db.query(text, [phone]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /* @returns {object} returns all users
   */
  async findAll() {
    const findAllQuery = 'SELECT id, firstname, lastname, username, phoneNumber, email, avatar, role,createdDate, modifiedDate FROM users';
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
      SET firstname=$1,lastname=$2,email=$3,phonenumber=$4,password=$5,avatar=$6,role=$7,modifiedDate=$8
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
        data.phoneNumber || rows[0].phonenumber,
        data.password || rows[0].password,
        data.avatar || rows[0].avatar,
        data.role || rows[0].role,
        moment(new Date()),
        rows[0].id,
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

  // create admin
  async adminMaker() {
    const text = 'INSERT INTO users (id, firstname, lastname, username, phoneNumber, email, avatar, password, role,createdDate, modifiedDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
    const values = [
      uuid.v4(),
      'Admin',
      'super',
      'superadmin',
      '0000000000',
      'admin@broadcaster.com',
      './server/public/upload/testimage.jpeg',
      'admin@super',
      'admin',
      moment(new Date()),
      moment(new Date()),
    ];
    try {
      const { rows } = await db.query(text, values);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*
    drop table
  */
  async dropTable() {
    const queryText = 'TRUNCATE users CASCADE';
    await db.query(queryText);
  }

  /*
    create table
  */
  async createTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL UNIQUE,
        username VARCHAR(128) NOT NULL UNIQUE,
        role VARCHAR(128) NOT NULL,
        phoneNumber VARCHAR(128) NOT NULL UNIQUE,
        avatar VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        createdDate TIMESTAMP,
        modifiedDate TIMESTAMP
      )`;

    await db.query(queryText);
  }
}
export default new User();

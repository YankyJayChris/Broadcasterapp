import moment from 'moment';
import uuid from 'uuid';

import db from '../../db';

class RedFlag {
  /*
    @returns {object} red-flag object
   */
  async create(data) {
    const newredFlag = {
      id: uuid.v4(),
      title: data.title || '',
      comment: data.comment || '',
      status: data.status || 'draft',
      type: data.type || '',
      location: data.location || '',
      images: data.images || [],
      videos: data.videos || [],
      createdBy: data.createdBy || '',
      createdDate: moment(new Date()),
      modifiedDate: moment(new Date()),
    };
    const text = 'INSERT INTO redflags (id, title, comment, status, type, location, images, videos, createdBy,createdDate, modifiedDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
    const values = [
      newredFlag.id,
      newredFlag.title,
      newredFlag.comment,
      newredFlag.status,
      newredFlag.type,
      newredFlag.location,
      newredFlag.images,
      newredFlag.videos,
      newredFlag.createdBy,
      newredFlag.createdDate,
      newredFlag.modifiedDate,
    ];
    try {
      const { rows } = await db.query(text, values);
      console.log(rows[0]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*  @param {uuid} id
      @returns {object} redFlag object
   */
  async findOne(id) {
    const text = 'SELECT redflags.id, redflags.title, redflags.comment, redflags.status, redflags.type, redflags.location, redflags.images, redflags.videos, redflags.createdBy, redflags.createdDate, redflags.modifiedDate, users.firstname, users.lastname, users.username, users.username, users.avatar FROM redflags JOIN users ON redflags.createdBy= users.id WHERE redflags.id= $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*  @param {uuid} id
      @returns {object} redFlag object
   */
  async findbeenCreated(createdBy, title, comment) {
    const text = 'SELECT * FROM redflags WHERE createdBy = $1 AND title =$2';
    try {
      const { rows } = await db.query(text, [createdBy, title, comment]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*
    @returns {object} returns all redFlags
   */
  async findAll() {
    const findAllQuery = 'SELECT redflags.id, redflags.title, redflags.comment, redflags.status, redflags.type, redflags.location, redflags.images, redflags.videos, redflags.createdBy, redflags.createdDate, redflags.modifiedDate, users.firstname, users.lastname, users.username, users.username, users.avatar FROM redflags JOIN users ON redflags.createdBy= users.id ';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      console.log(rowCount);
      return rows;
    } catch (error) {
      return error;
    }
  }

  /*
     @param {uuid} id
     @param {object} data
   */
  async update(id, data) {
    const queryString = 'SELECT * FROM redflags WHERE id=$1';
    const updateOneQuery = `UPDATE redflags
      SET title=$1,comment=$2,status=$3,type=$4,location=$5,modifiedDate=$6
      WHERE id=$7 returning *`;
    try {
      const { rows } = await db.query(queryString, [id]);
      if (!rows[0]) {
        return { message: 'redflag not found' };
      }
      const values = [
        data.title || rows[0].title,
        data.comment || rows[0].comment,
        data.status || rows[0].status,
        data.type || rows[0].type,
        data.location || rows[0].location,
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
    const deleteQuery = 'DELETE FROM redflags WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [id]);
      if (!rows[0]) {
        return { message: 'redflag not found' };
      }
      return { message: 'deleted' };
    } catch (error) {
      return error;
    }
  }

  /*
    drop table
  */
  async dropTable() {
    const queryText = 'DROP TABLE IF EXISTS redflags';
    await db.query(queryText);
  }

  /*
    create table
  */
  async createTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
      redflags(
        id UUID PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        createdBy UUID NOT NULL REFERENCES users (id),
        title VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        comment text NOT NULL,
        images text[],
        videos text[],
        createdDate TIMESTAMP,
        modifiedDate TIMESTAMP
      )`;

    await db.query(queryText)
      .then(() => {
        console.log('redflags table created');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new RedFlag();

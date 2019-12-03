import moment from 'moment';
import uuid from 'uuid';

class RedFlag {
  /* class constructor
     @param {object} data
   */
  constructor() {
    this.redFlags = [];
  }

  /*
    @returns {object} red-flag object
   */
  create(data) {
    const newredFlag = {
      id: uuid.v4(),
      type: data.type || '',
      createdBy: data.createdBy || '',
      title: data.title || '',
      status: data.status || 'draft',
      location: data.location || '',
      comment: data.comment || '',
      images: data.images || [],
      videos: data.videos || [],
      createdOn: moment.now(),
      modifiedDate: moment.now(),
    };
    this.redFlags.push(newredFlag);
    return newredFlag;
  }

  /*  @param {uuid} id
      @returns {object} redFlag object
   */
  findOne(id) {
    return this.redFlags.find((redFlag) => redFlag.id === id);
  }

  /*
    @returns {object} returns all redFlags
   */
  findAll() {
    return this.redFlags;
  }

  /*
     @param {uuid} id
     @param {object} data
   */
  update(id, data) {
    const redFlag = this.findOne(id);
    const index = this.redFlags.indexOf(redFlag);
    this.redFlags[index].type = data.type || redFlag.type;
    this.redFlags[index].title = data.title || redFlag.title;
    this.redFlags[index].comment = data.comment || redFlag.comment;
    this.redFlags[index].location = data.location || redFlag.location;
    this.redFlags[index].status = data.status || redFlag.status;
    this.redFlags[index].modifiedDate = moment.now();
    return this.redFlags[index];
  }

  /*
    @param {uuid} id
   */
  delete(id) {
    const redFlag = this.findOne(id);
    const index = this.redFlags.indexOf(redFlag);
    this.redFlags.splice(index, 1);
    return { id, message: 'red-flag record has been deleted' };
  }
}
export default new RedFlag();

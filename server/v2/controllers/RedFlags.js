import RedFlagModel from '../models/RedFlag';

const RedFlag = {
  /* @param {object} req
    @param {object} res
    @returns {object} redFlags array
   */
  async getAll(req, res) {
    const redFlags = await RedFlagModel.findAll();
    return res.status(200).send({ data: redFlags });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} redFlag object
   */
  async create(req, res) {
    if (req.fileValidationError) {
      return res.send({ error: req.fileValidationError });
    }
    const images = [];
    const videos = [];
    const { files, user, body } = req;
    const postExist = await RedFlagModel.findbeenCreated(user.id, body.title, body.comment);
    if (postExist) {
      return res.status(409).send({ message: 'redFlag already exist' });
    }
    const newRedflag = body;
    if (files !== undefined) {
      if (files.length <= 0) {
        newRedflag.images = [];
        newRedflag.videos = [];
      } else {
        files.forEach((file) => {
          if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/pjpeg') {
            images.push(`/public/upload/${file.filename}`);
          } else {
            videos.push(`/public/upload/${file.filename}`);
          }
        });
      }
    }

    newRedflag.images = images;
    newRedflag.videos = videos;
    newRedflag.createdBy = user.id;
    const redFlag = await RedFlagModel.create(newRedflag);
    return res.status(201).send({ data: redFlag, message: 'Created red-flag record' });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} redFlag object
   */
  async getOne(req, res) {
    const redFlag = await RedFlagModel.findOne(req.params.id);
    if (!redFlag) {
      return res.status(422).send({ message: 'redFlag not found' });
    }
    return res.status(200).send({ data: redFlag });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated redFlag
   */
  async update(req, res) {
    const redFlag = await RedFlagModel.findOne(req.params.id);
    if (!redFlag) {
      return res.status(404).send({ error: 'redFlag not found' });
    }
    if (redFlag.createdBy !== req.user.id) {
      return res.status(401).send({ error: 'this redflag is not yours' });
    }
    const updateData = {
      comment: req.body.comment,
      location: req.body.location,
      title: req.body.title,
      type: req.body.type,
    };
    const updatedredFlag = await RedFlagModel.update(req.params.id, updateData);
    return res.status(200).send({ data: updatedredFlag, message: 'Updated red-flag record' });
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated status redFlag
   */
  async updateStatus(req, res) {
    const redFlag = RedFlagModel.findOne(req.params.id);
    if (!redFlag) {
      return res.status(422).send({ message: 'redFlag not found' });
    }
    if (req.user.type !== 'admin') {
      return res.status(403).send({ error: 'you are not an admin' });
    }
    const updatedredFlag = await RedFlagModel.update(req.params.id, { status: req.body.status });
    return res.status(200).send({ data: updatedredFlag, message: 'Updated red-flag record' });
  },
  /* @param {object} req
    @param {object} res
    @returns {void} return statuc code 204
   */
  async delete(req, res) {
    const redFlag = await RedFlagModel.findOne(req.params.id);
    const thisflag = redFlag;
    if (!redFlag) {
      return res.status(404).send({ error: 'redFlag not found' });
    }
    if (thisflag.email !== req.user.email) {
      return res.status(401).send({ error: 'this redflag is not yours' });
    }
    const deletedredFlag = await RedFlagModel.delete(req.params.id);
    return res.status(200).send(deletedredFlag);
  },
};

export default RedFlag;

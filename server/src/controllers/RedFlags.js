import RedFlagModel from '../models/RedFlag';

const RedFlag = {
  /* @param {object} req
    @param {object} res
    @returns {object} redFlags array
   */
  getAll(req, res) {
    const redFlags = RedFlagModel.findAll();
    return res.status(200).send(redFlags);
  },
  /* @param {object} req
    @param {object} res
    @returns {object} redFlag object
   */
  create(req, res) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    const images = [];
    const videos = [];
    const { files, user } = req;

    const newRedflag = req.body;
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
    const redFlag = RedFlagModel.create(newRedflag);
    return res.status(201).send(redFlag);
  },
  /* @param {object} req
    @param {object} res
    @returns {object} redFlag object
   */
  getOne(req, res) {
    const redFlag = RedFlagModel.findOne(req.params.id);
    if (!redFlag) {
      return res.status(404).send({ message: 'redFlag not found' });
    }
    return res.status(200).send(redFlag);
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated redFlag
   */
  update(req, res) {
    const redFlag = RedFlagModel.findOne(req.params.id);
    if (!redFlag) {
      return res.status(404).send({ message: 'redFlag not found' });
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
    const updatedredFlag = RedFlagModel.update(req.params.id, updateData);
    return res.status(200).send(updatedredFlag);
  },
  /* @param {object} req
    @param {object} res
    @returns {object} updated status redFlag
   */
  updateStatus(req, res) {
    const redFlag = RedFlagModel.findOne(req.params.id);
    if (!redFlag) {
      return res.status(404).send({ message: 'redFlag not found' });
    }
    if (req.user.type !== 'admin') {
      return res.status(403).send({ error: 'you are not an admin' });
    }
    const updatedredFlag = RedFlagModel.update(req.params.id, { status: req.body.status });
    return res.status(200).send(updatedredFlag);
  },
  /* @param {object} req
    @param {object} res
    @returns {void} return statuc code 204
   */
  delete() {
    // TO DO
  },
};

export default RedFlag;

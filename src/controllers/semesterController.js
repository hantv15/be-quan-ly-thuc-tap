import semester from "../models/semester";
export const getSemester = async (req, res) => {
  try {
    const data = await semester.find().sort({ createdAt: -1 });
    const dataDefault = await semester.findOne({
      $and: [
        { start_time: { $lte: new Date() } },
        { date_time: { $gte: new Date() } },
      ],
    });
    res.status(200).json({ defaultSemester: dataDefault, listSemesters: data });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getDefaultSemester = async (req, res) => {
  try {
    const data = await semester.findOne({
      $and: [
        { start_time: { $lte: new Date() } },
        { date_time: { $gte: new Date() } },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateSemester = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const find = await semester.findOne(query);
    const reqName = req.body.name.toLowerCase();

    const findName = await semester.findOne({
      name: reqName,
    });

    if (findName) {
      return res.status(500).send({
        message: "Tên kỳ đã tồn tại, vui lòng đặt tên khác!",
      });
    }

    if (find) {
      const data = await semester.findOneAndUpdate(query, req.body);
      return res.status(200).json(data);
    } else {
      return res.status(500).json({
        message: "Kỳ không tồn tại!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Có lỗi vui lòng thử lại sau",
    });
  }
};

export const insertSemester = async (req, res) => {
  try {
    const reqName = req.body.name.toLowerCase();
    const findName = await semester.findOne({
      name: reqName,
    });

    if (findName) {
      return res.status(500).send({
        message: "Tên kỳ đã tồn tại, vui lòng đặt tên khác!",
      });
    }
    const data = await new semester(req.body).save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Có lỗi vui lòng thử lại sau",
    });
  }
};

import ConfigTime from "../models/configTime";

export const checkRequestTime = async (req, res, next) => {
  const { typeNumber, _id } = req.body;
  try {
    const dateNow = Date.now();
    const { startTime, endTime } = await ConfigTime.findOne({
      typeNumber,
    });
    if (dateNow > startTime && dateNow < endTime) {
      next();
    } else {
      return res.status(400).json({
        message: "Hết thời gian nộp form",
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

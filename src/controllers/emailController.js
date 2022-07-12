require("dotenv").config();
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hantvnodemailer@gmail.com",
    pass: "imsrgztckjtimpiq",
  },
});

export const sendMailUser = async (req, res) => {
  try {
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    let mainOptions = {
      from: "NQH-Test nodemailer",
      to: req.body.mail,
      subject: req.body.subject,
      html: req.content,
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res
          .status(200)
          .send({ message: "Một email đã được gửi đến tài khoản của bạn" }); //Gửi thông báo đến người dùng
      }
    });
    // res.status(200).json(req.body.mail);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sendMail = async (req, res) => {
  try {
    let mainOptions = {
      from: '"Phòng QHDN" <foo@example.com>',
      to: req.mail,
      subject: req.subject,
      html: req.content,
    };
    transporter.sendMail(mainOptions, function (error, succes) {
      try {
        return res.status(200).send({ message: "Gửi email thành công" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Có lỗi xảy ra, không gửi được email" });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

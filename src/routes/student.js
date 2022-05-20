import express from "express";
const router = express.Router();

import {
  insertStudent,
  listStudent,
  listStudentReviewCV,
  readOneStudent,
  removeStudent,
  updateReviewerStudent,
  updateStatusStudent,
  updateStudent,
  readStudentById,
} from "../controllers/student";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import student from "../models/student";
router.get("/student", isAuthenticateUser, listStudent);
router.get("/student/reviewcv", isAuthenticateUser, listStudentReviewCV);
router.get("/student/:id", isAuthenticateUser, readOneStudent);
router.get("/student/manager/:id", readStudentById);
router.post(
  "/student",
  isAuthenticateUser,
  authorizeRoles("manager"),
  insertStudent
);
router.patch(
  "/student",
  isAuthenticateUser,
  authorizeRoles("manager"),
  updateReviewerStudent
);
router.patch(
  "/student/status",
  isAuthenticateUser,
  authorizeRoles("manager"),
  updateStatusStudent
);
router.patch(
  "/student/:id",
  isAuthenticateUser,
  authorizeRoles("manager"),
  updateStudent
);
router.delete(
  "/student/:id",
  isAuthenticateUser,
  authorizeRoles("manager"),
  removeStudent
);
router.post("/generate-fake-data", () => {
  for (let i = 0; i <= 30; i++) {
    student.create({
      name: "Dương Điệp" + i,
      CV: "61c5d4d60e722e6436118598",
      studentCode: "Ok" + i,
      email: "Còn Hàng",
      address: "Ngô thừa ân",
      internshipIndustry: "Kì 6",
      phoneNumber: 4,
    });
  }
});
module.exports = router;

import express from "express";
import { authenticate, authorize } from "../controllers/auth_controller.js"; // Adjust the path if the controller is in a different directory

const router = express.Router();

// Route for user authentication (login)
router.post("/login", authenticate);

// Example of a protected route that requires authorization
router.get("/protected", authorize, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have access to this protected route!",
  });
});

export default router;

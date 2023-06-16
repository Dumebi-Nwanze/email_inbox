import express from "express";
import pool from "../db.js";
import { jwtToken } from "../jwtHelper.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const values = [email, password];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const user = result.rows[0];
      let tokens = jwtToken({
        uid: user.uid,
        name: user.name,
        email: user.email,
      });
      res.cookie("refresh_token", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.json(tokens);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) {
      return res.status(401).json({ error: "Empty refresh token" });
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) {
          return res.status(403).json({ JWTerror: error.message });
        }
        let tokens = jwtToken(user);
        res.cookie("refresh_token", tokens.refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.json({ message: "Refreshed token", token: tokens });
      }
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.get("/refresh_token", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.json({ message: "Refresh token cleared" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;

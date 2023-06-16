import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware.js";

const router = express.Router();

router.get("/get-all-mail", authenticateToken, async (req, res) => {
  try {
    const emails = await pool.query("SELECT * FROM emails");

    res.json(emails.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/send-mail", authenticateToken, async (req, res) => {
  const { subject, body } = req.body;
  try {
    const emails = await pool.query(
      "INSERT INTO emails (subject, body, isRead) VALUES ($1, $2, $3) RETURNING id",
      [subject, body, false]
    );

    res.json(emails.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.post("/read-mail", authenticateToken, async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query("UPDATE emails SET isRead = true WHERE id = $1", [id]);

    const updatedEmail = await pool.query(
      "SELECT * FROM emails WHERE id = $1",
      [id]
    );

    res.json({ message: "Read Email", update: updatedEmail.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/get-mail/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const email = await pool.query("SELECT * FROM emails WHERE id = $1", [id]);

    if (email.rows.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    res.json(email.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;

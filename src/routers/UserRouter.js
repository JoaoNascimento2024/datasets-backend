import express from "express";
import { createUser, listUser } from "../controller/UserController.js";

const router = express.Router();

router.post("/", createUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The hashed password of the user.
 *         profile:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *           description: The profile associated with the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the user.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the user.
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.get("/", listUser);

export default router;
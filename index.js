import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import env from "dotenv";

import { checkAuth } from "./server/utils/checkAuth.js";
import * as Validator from "./validations.js";
import ValidationErrors from "./server/utils/ValidationErrors.js";
import * as CommentController from "./server/controllers/CommentController.js";
import * as UserController from "./server/controllers/UserController.js";
import * as PictureController from "./server/controllers/PictureController.js";
import * as FavoriteController from "./server/controllers/FavoriteController.js";

env.config();
const PORT = process.env.PORT || 5000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@gallery.gnsr5hn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB okay"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", UserController.login);
app.post("/auth/register", Validator.registerValidator, ValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/auth/user/:id', checkAuth, UserController.getUserById);
app.patch('/auth/user/info/:id', checkAuth, UserController.updateUser);
app.patch('/auth/user/password/:id', checkAuth, Validator.updatePasswordValidator, ValidationErrors, UserController.updatePassword);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/gallery/top5", PictureController.getTopFivePopularPictures);
app.get("/gallery/popular/lastmonth", PictureController.getMostPopularPictureLastMonth);

app.get("/gallery", PictureController.getAll);
app.get("/gallery/:id", PictureController.getPicture);
app.post("/gallery/create", Validator.pictureCreateValidator, ValidationErrors, PictureController.createPicture);
app.delete("/gallery/:id", PictureController.deletePicture);
app.get("/gallery/sorted/date", PictureController.getPicturesSortedByDate);
app.get("/gallery/sorted/popular", PictureController.getPicturesSortedByPopularity);
app.get("/gallery/search/name", PictureController.searchPicturesByName);
app.get("/gallery/search/artist", PictureController.searchPicturesByArtist);
app.get("/gallery/search/genre", PictureController.searchPicturesByTag);
app.get("/gallery/search/recommendations/:id", PictureController.getRecommendations);

app.post('/favorite', checkAuth, FavoriteController.addFavorite);
app.delete('/favorite', checkAuth, FavoriteController.removeFavorite);
app.get('/favorite/:painting_id', checkAuth, FavoriteController.checkIfFavorite);
app.get("/:id/favorites", FavoriteController.getFavoritesCountByPicture);

app.get("/allpictures/:id", PictureController.getPicturesByArt);
app.get("/favorites/:id", PictureController.getFavoritePicturesByUser);


app.get('/moderation', PictureController.getPicturesByStatus);
app.put('/moderation/publish/:id', PictureController.publishPicture);
app.put('/moderation/reject/:id', PictureController.rejectPicture);

app.delete("/gallery/:id/comment", CommentController.deleteComment);
app.post('/gallery/:id/comment', checkAuth, CommentController.createComment);
app.get('/gallery/:id/comments', CommentController.getCommentsByPicture);
app.get("/:id/comments", CommentController.getCommentsCountByPicture);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

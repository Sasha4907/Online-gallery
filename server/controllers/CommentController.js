import CommentModel from '../models/Comment.js';
import PictureModel from '../models/Picture.js';
import UserModel from '../models/User.js';

export const createComment = async (req, res) => {
  try {
    const comment = new CommentModel({
      user_id: req.body.userId,
      painting_id: req.body.pictureId,
      content: req.body.content
    });

    const savedComment = await comment.save();

    res.json({ message: "Коментар додано успішно", savedComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при створенні коментаря" });
  }
};

export const getCommentsByPicture = async (req, res) => {
  try {
    const pictureId = req.params.id;

    const comments = await CommentModel.find({ painting_id: pictureId })
      .populate('user_id', 'nikname avatar')
      .exec();

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при отриманні коментарів" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    const existingComment = await CommentModel.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "Коментар не знайдено" });
    }

    await CommentModel.findByIdAndDelete(commentId);

    res.json({ message: "Коментар успішно видалено" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при видаленні коментаря" });
  }
};

export const getCommentsCountByPicture = async (req, res) => {
  try {
    const pictureId = req.params.id;

    const commentsCount = await CommentModel.countDocuments({ painting_id: pictureId });

    res.json({ commentsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при отриманні кількості коментарів" });
  }
};
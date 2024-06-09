import Favorite from '../models/Favorite.js';
import Picture from '../models/Picture.js';

export const addFavorite = async (req, res) => {
  try {
    const user_id = req.userId;
    const { painting_id } = req.body;

    const existingFavorite = await Favorite.findOne({ user_id, painting_id });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Вподобання вже існує' });
    }

    const newFavorite = new Favorite({ user_id, painting_id });
    await newFavorite.save();

    res.json(newFavorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не вдалось додати вподобання' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user_id = req.userId;
    const { painting_id } = req.body;

    const deletedFavorite = await Favorite.findOneAndDelete({ user_id, painting_id });

    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Вподобання не знайдено' });
    }

    res.json({ message: 'Вподобання видалено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не вдалось видалити вподобання' });
  }
};

export const checkIfFavorite = async (req, res) => {
    try {
      const user_id = req.userId;
      const { painting_id } = req.params;
  
      const favorite = await Favorite.findOne({ user_id, painting_id });
  
      if (favorite) {
        return res.json({ liked: true });
      } else {
        return res.json({ liked: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Не вдалось перевірити вподобання' });
    }
  };

  export const getFavoritesCountByPicture = async (req, res) => {
    try {
      const pictureId = req.params.id;
  
      const favoritesCount = await Favorite.countDocuments({ painting_id: pictureId });
  
      res.json({ favoritesCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка при отриманні кількості лайків" });
    }
  };
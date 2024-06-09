import PictureModel from "../models/Picture.js";
import UserModel from "../models/User.js";
import FavoriteModel from "../models/Favorite.js";
import moment from 'moment';

// Створення нової картини
export const createPicture = async (req, res) => {
    try {
        const doc = new PictureModel({
            title: req.body.title,
            tag: req.body.tag,
            text: req.body.text,
            picture: req.body.picture,
            user: req.body.user
        });

        const savedPicture = await doc.save();

        res.json(savedPicture);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка при створенні картини" });
    }
}

// Отримання всіх опублікованих картин
export const getAll = async (req, res) => {
    try {
        const pictures = await PictureModel.find({ status: 'опубліковано' }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
}

// Отримання картини за її ID
export const getPicture = async (req, res) => {
    try {
        const pictureId = req.params.id;
        const picture = await PictureModel.findOneAndUpdate(
            { _id: pictureId }, 
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).populate('user');

        if (!picture) {
            return res.status(404).json({ message: "Цієї картини не існує" });
        }

        res.json(picture);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
};

// Видалення картини за її ID
export const deletePicture = async (req, res) => {
    try {
        const pictureId = req.params.id;
        
        const doc = await PictureModel.findOneAndDelete({
            _id: pictureId
        });

        if (!doc) {
            return res.status(404).json({ message: "Цієї картини не існує" });
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з видаленням картин" });
    }
}

// Отримання картин, які знаходяться на модерації
export const getPicturesByStatus = async (req, res) => {
    try {
        const pictures = await PictureModel.find({ status: 'обробляється' }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
         res.status(500).json({ message: "Помилка з виводом картин" });
    }
};

// Отримання картин, які належать певному користувачу
export const getPicturesByArt = async (req, res) => {
    try {
        const pictures = await PictureModel.find({ user: req.params.id }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
}

// Публікація картини за її ID
export const publishPicture = async (req, res) => {
    try {
      const pictureId = req.params.id;
      const updatedPicture = await PictureModel.findByIdAndUpdate(pictureId, { status: 'опубліковано' }, { new: true });
      res.json(updatedPicture);
    } catch (error) {
      res.status(500).json({ message: 'Помилка зі зміною статусу' });
    }
  };
  
// Відхилення картини за її ID
export const rejectPicture = async (req, res) => {
    try {
      const pictureId = req.params.id;
      const updatedPicture = await PictureModel.findByIdAndUpdate(pictureId, { status: 'відхилено' }, { new: true });
      res.json(updatedPicture);
    } catch (error) {
        res.status(500).json({ message: 'Помилка зі зміною статусу' });
    }
  };

// Отримання опублікованих картин, відсортованих за датою
export const getPicturesSortedByDate = async (req, res) => {
    try {
        const pictures = await PictureModel.find({ status: 'опубліковано' }).sort({ date: -1 }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
};

// Отримує всі картини відсортовані за популярністю
export const getPicturesSortedByPopularity = async (req, res) => {
    try {
        const pictures = await PictureModel.find({ status: 'опубліковано' }).sort({ viewsCount: -1 }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
};

// Отримує топ-5 найпопулярніших картин
export const getTopFivePopularPictures = async (req, res) => {
    try {
        const pictures = await PictureModel.find({ status: 'опубліковано' })
            .sort({ viewsCount: -1 })
            .limit(5)
            .populate('user')
            .exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
};

// Отримує найпопулярнішу картину за останній місяць
export const getMostPopularPictureLastMonth = async (req, res) => {
    try {
        const oneMonthAgo = moment().subtract(1, 'months').toDate();
        const picture = await PictureModel.find({
            status: 'опубліковано',
            date: { $gte: oneMonthAgo }
        })
        .sort({ viewsCount: -1 })
        .limit(1)
        .populate('user')
        .exec();
        res.json(picture);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом картин" });
    }
};

// Шукає картини за назвою
export const searchPicturesByName = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const pictures = await PictureModel.find({ title: { $regex: searchTerm, $options: "i" }, status: 'опубліковано' }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з пошуком" });
    }
};

// Шукає картини за художником
export const searchPicturesByArtist = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const regex = new RegExp(searchTerm, 'i');
        const users = await UserModel.find({ $or: [{ nikname: regex }, { name: regex }] });
        const userIds = users.map(user => user._id);
        const pictures = await PictureModel.find({ user: { $in: userIds }, status: 'опубліковано' }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з пошуком" });
    }
};

// Шукає картини за тегом
export const searchPicturesByTag = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const pictures = await PictureModel.find({ tag: { $regex: searchTerm, $options: "i" }, status: 'опубліковано' }).populate('user').exec();
        res.json(pictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з пошуком" });
    }
};

// Отримує улюблені картини користувача
export const getFavoritePicturesByUser = async (req, res) => {
    try {
        const favorites = await FavoriteModel.find({ user_id: req.params.id }, 'painting_id');
        const favoritePictures = await PictureModel.find({ _id: { $in: favorites.map(favorite => favorite.painting_id) } }).populate('user');

        res.json(favoritePictures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка з виводом улюблених картин" });
    }
};

// Отримує рекомендації для користувача
export const getRecommendations = async (req, res) => {
    try {
        const userId = req.params.id;
        const userFavorites = await FavoriteModel.find({ user_id: userId });

        const genreCounts = await PictureModel.aggregate([
            { 
                $match: { _id: { $in: userFavorites.map(favorite => favorite.painting_id) } }
            },
            {
                $group: { _id: "$tag", count: { $sum: 1 } }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        const mostPopularGenre = genreCounts.length > 0 ? genreCounts[0]._id : null;

        const favoriteArtists = await PictureModel.aggregate([
            { 
                $match: { _id: { $in: userFavorites.map(favorite => favorite.painting_id) } }
            },
            {
                $group: { _id: "$user", count: { $sum: 1 } }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        const mostPopularArtist = favoriteArtists.length > 0 ? favoriteArtists[0]._id : null;
        const recommendations = await PictureModel.find({$or: [{ tag: mostPopularGenre }, { user: mostPopularArtist }], status: 'опубліковано' });
        res.json(recommendations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Помилка при отриманні даних" });
    }
};
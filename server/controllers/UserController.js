import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await UserModel.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "Користувач вже існує" });
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const Hash = await bcrypt.hash(password, salt);
  
      const randomNumber = Math.floor(Math.random() * 10000);
      const nikname = `User${randomNumber}`;

      const doc = new UserModel({
        email: req.body.email,
        status: req.body.status,
        passwordHash: Hash,
        nikname: nikname
      });
  
      const user = await doc.save();
  
      const token = jwt.sign({ 
        _id: user._id,
      }, process.env.JWT_SECRET, {expiresIn: '10d'});
  
      const {passwordHash, userData} = user._doc;
  
      res.json({
        userData,
        token,
        message: "Реєстрація пройшла успішно"
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка при реєстрації" });
    }
};

export const login = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({ message: "Невірний пароль або пошта" });
      }
  
      const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        
      if (!isValidPassword) {
        return res.status(404).json({ message: "Невірний пароль або пошта" });
      }
  
      const token = jwt.sign({ 
        _id: user._id,
      }, process.env.JWT_SECRET, {expiresIn: '10d'});
  
      const {passwordHash, userData} = user._doc;
  
      res.json({
        userData,
        token
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Помилка при авторизації" });
    }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Доступ відсутній',
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById( userId);

    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено',
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Помилка при отриманні інформації про користувача',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
      
    const updates = {};
    if (req.body.nikname) updates.nikname = req.body.nikname;
    if (req.body.name) updates.name = req.body.name;
    if (req.body.avatar) updates.avatar = req.body.avatar;

    await UserModel.updateOne({ _id: userId }, updates);

    res.json({ 
      success: true,
      message: "Редагування внесені успішно" 
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при редагуванні профілю" });
}
}

export const updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById( userId );

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Старий пароль неправильний" });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = newHash;
    await user.save();

    res.json({ message: "Пароль успішно змінено" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при зміні пароля" });
  }
}
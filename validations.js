import {body} from 'express-validator'

export const registerValidator = [
    body('email', 'Невірний формат електронної пошти').exists().isEmail(),
    body('password', 'Пароль повинен містити 5 і більше символів').exists().isLength({ min: 5}),
    body('status', 'Невідомий статус').isIn(['user', 'artist', 'admin' ])
];

export const updatePasswordValidator = [
    body('newPassword', 'Пароль повинен містити 5 і більше символів').exists().isLength({ min: 5}),
];

export const pictureCreateValidator = [
    body('title', 'Заголовок має бути не менше 2 символів').exists().isLength({ min: 2}).isString(),
    body('text', 'Опис має бути більшим ніж 15 символів').exists().isLength({ min: 15}).isString(),
    body('picture', 'Невірний формат картини').exists().isString(),
];

export const commentCreateValidator = [
    body('content', 'Введіть текст коментаря').isString().isLength({ min: 1 }),
  ];
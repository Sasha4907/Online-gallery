import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded._id;

            next()
        } catch (e) {
            return res.status(401).json({
                message: 'Немає доступу.',
            })
        }
    } else {
        return res.status(401).json({
            message: 'Немає доступу.',
        })
    }
}
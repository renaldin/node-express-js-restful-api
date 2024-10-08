import userService from "../service/userService.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const get = async (req, res, next) => {
    try {
        const username = req.user.username
        const result = await userService.get(username)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username
        const request = req.body
        request.username = username
        const result = await userService.update(request)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.username)
        res.status(200).json({
            data: 'Ok'
        })
    } catch (err) {
        next(err)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}

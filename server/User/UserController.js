import User from "./User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import  {secretAceess, secretRefresh}  from "../configToken.js"
import TokenService from "../Token/TokenService.js"
import Token from "../Token/Token.js"

export const genereateTokens = (id) =>{
    const payload = {
        id
    }
    const accessToken = jwt.sign(payload,secretAceess,{expiresIn:"5min"})
    const refreshToken = jwt.sign(payload, secretRefresh, {expiresIn:"24h"})

    return {accessToken,refreshToken}
}

class userController {
    async logIn(req, res) {
        try {
            const {login,password} = req.body
            const user = await User.findOne({login})
            user.online = true;
            user.save()
            if(!user){
                return res.status(500).json('Неверный логин')
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(500).json('Неверный пароль')
            }
            const tokens = genereateTokens(user._id)
            await TokenService.saveRefreshToken(user._id,tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({tokens,user})
        } catch (e) {
            res.status(500)
        }
    }
    async logOut(req,res){
        try{
            const {refreshToken} = req.cookies
            const token = await Token.findOne({refreshToken})
            await Token.deleteOne({_id:token._id})
            const user = await User.findOne({_id:token.user})
            user.online = false
            res.cookie('refreshToken', '')
            user.save()
            res.status(200).json('logout')
        }catch(e){
            res.status(500)
        }
    }
    async registration(req, res) {
        try {
            const { login, password, email } = req.body
            const findUser = await User.findOne({ login })
            if (findUser) {
                return res.status(500).json('Пользователь с таким именем уже найден')
            }
            const hashPassword = bcrypt.hashSync(password,7)
            const newUser =  await new User({login,password:hashPassword,email})
            newUser.save();
            const tokens = genereateTokens(newUser._id)
            await TokenService.saveRefreshToken(newUser._id,tokens.refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json({newUser,tokens})
        } catch (e) {
            return res.status(500)
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (e) {
            res.status(500)
        }
    }
    async refresh(req,res){
        try{
            const {refreshToken} =  req.cookies
            const tokens = TokenService.refreshedToken(refreshToken)
            return res.status(200).json(tokens)
        }catch(e){
            return res.status(500)
        }
    }
}

export default new userController()
import Token from './Token.js'
import jwt from 'jsonwebtoken'
import { secretAceess } from '../configToken.js'
import { genereateTokens } from '../User/UserController.js'
import User from '../User/User.js'
class TokenService {
    async saveRefreshToken(id, refreshToken) {
        const tokenData = await Token.findOne({ user: id })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await new Token({ user: id, refreshToken })
        return token.save();
    }
    validateAccessToken(accessToken) {
        try {
            const userData = jwt.verify(accessToken, secretAceess)
            return userData
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, secretAceess) 
            return userData
        } catch (e) {
            return null
        }
    }
    async refreshedToken(refreshToken){
        const userData = this.validateRefreshToken(refreshToken)
        if(!userData){
            return null
        }
        // const user = await Token.findOne(refreshToken)
        const findUser = await User.findOne({id:userData.id})
        const tokents = genereateTokens(userData.id) 
        const responceData = {findUser,tokents}
        return responceData
    }
}
export default new TokenService()
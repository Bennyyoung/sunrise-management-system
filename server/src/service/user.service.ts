import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User, UserDocument } from "src/model/user.schema"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async signIn(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel.findOne({ ID: user.ID }).exec()
        if (foundUser) {
            const { password } = foundUser
            if (bcrypt.compare(user.password, password)) {
                const payload = { ID: user.ID }
                return {
                    token: jwt.sign(payload)
                };
            }
            return new HttpException('Incorrect email ID or password', HttpStatus.UNAUTHORIZED)
        }
        return new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED)
    }
    
}
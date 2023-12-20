import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Admin, AdminDocument } from "src/model/admin.schema"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) { }

    async signUp(admin: Admin): Promise<Admin> {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(admin.password, salt)
        const reqBody = {
            name: admin.name,
            address: admin.address,
            emailAddress: admin.emailAddress,
            password: hash,
            primaryPhoneNumber: admin.primaryPhoneNumber,
            secondaryPhoneNumber: admin.secondaryPhoneNumber,
            CAC: admin.CAC,
            role: admin.role
        }
        const newAdmin = new this.adminModel(reqBody)
        return newAdmin.save()
    }
}
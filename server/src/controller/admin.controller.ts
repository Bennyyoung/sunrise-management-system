import { Body, Controller, HttpStatus, Post, Res} from "@nestjs/common"
import { Admin } from "src/model/admin.schema"
import { AdminService } from "src/service/admin.service"
import { JwtService} from "@nestjs/jwt"

@Controller('/api/v1/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService, private jwtService: JwtService) {}

    @Post('/signup')
    async AdminSignup(@Res() response, @Body() admin: Admin ) {
        const newAdmin = this.adminService.signUp(admin) 
        return response.status(HttpStatus.CREATED).json({
            newAdmin
        })
    }
}
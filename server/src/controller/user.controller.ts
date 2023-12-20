import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common"
import { User } from "src/model/user.schema"
import { UserService } from "src/service/user.service"
import { JwtService } from "@nestjs/jwt"

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    @Post('/sigin')
    async SignIn(@Res() response, @Body() user: User) {
        const token = await this.userService.signIn(user, this.jwtService)
        return response.status(HttpStatus.OK).json(token)
    }
} 
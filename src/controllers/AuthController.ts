import { Controller, Route, Validate } from "ndro-express-utils";
import { LoginBody } from "../types/auth.types";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import Joi from "joi";

const loginValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

@Controller("/auth")
export default class AuthController {
    @Route("post", "/login")
    @Validate(loginValidationSchema)
    async login(req: Request<{}, {}, LoginBody>, res: Response) {
        const { username, password } = req.body as {
            username: string;
            password: string;
        };

        const response = await AuthService.generateToken({ username, password });

        return res.json(response);
    }
}

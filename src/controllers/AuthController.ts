import { Controller, Route } from "ndro-express-utils";
import { LoginBody } from "../types/auth.types";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";

@Controller("/auth")
export default class AuthController {
    @Route("post", "/login")
    async login(req: Request<{}, {}, LoginBody>, res: Response) {
        const { username, password } = req.body as {
            username: string;
            password: string;
        };

        const response = await AuthService.generateToken({ username, password });

        return res.json(response);
    }
}

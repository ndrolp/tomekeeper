import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";
import { CONFIG } from "../config";
import { LoginResponse } from "../types/auth.types";

export class AuthService {
    static async generateToken(payload: JwtPayload): Promise<LoginResponse> {
        const token = jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: 60 });
        return { token };
    }

    static async verifyToken(token: string): Promise<JwtPayload | null> {
        if (CONFIG.USE_WARDEN) {
            try {
                const response = await axios.post(
                    `${CONFIG.warden.baseUrl}/auth/verify`,
                    {
                        token,
                    },
                );
                if (response.data && response.data.valid) {
                    return response.data.payload;
                }
                return null;
            } catch (error) {
                console.error("Error verifying token with Warden:", error);
                return null;
            }
        } else {
            // Validar token localmente
            try {
                const payload = jwt.verify(token, CONFIG.JWT_SECRET) as JwtPayload;
                return payload;
            } catch (error) {
                console.error("Invalid token:", error);
                return null;
            }
        }
    }
}

import { Request, Response } from "express";
import { createClient } from "../../../config/db";
import jwt from 'jsonwebtoken'
import { createRefreshToken, createSessionToken } from "../../../helpers/jwtHelpers";
import { LoginService } from "../../../services/both/auth/loginService";

export class LoginController {
  async handle(request: Request, response: Response) {
    let { email, password } = request.body
    
    const loginService = new LoginService()
    const resp = await loginService.execute(email, password)

    response.status(200).json({ token: resp });

  }
}

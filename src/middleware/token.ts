import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt/tokenHandler";

export interface RequestWithAuth<
  Params = any,
  ResBody = any,
  ReqBody = any,
  Query = any
> extends Request<Params, ResBody, ReqBody, Query> {
  token?: string;
  authData?: {
    userId: string;
    isAdmin: boolean;
  };
}

export function verifyTokenMiddleware(
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) {
  const key = req.cookies?.jwt; // cookieに含まれているkeyを取得
  if (key === undefined) {
    res.status(403).json({ message: "token is empty" });
    return;
  }
  try {
    const userInfo = verifyToken(key); // keyから情報を取り出す
    req.authData = userInfo;
    next(); // 問題なくここまで来たら、middlewareの次の処理へ
    return;
  } catch (e) {
    console.error(e);
    res.status(403).json({ message: "token is invalid" });
    return;
  }
}

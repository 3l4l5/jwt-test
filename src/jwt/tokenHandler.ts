import jwt from "jsonwebtoken";

// jwtの鍵になる部分。本来はハードコードせず、適切な管理をしてください。
const jwtSecret = "himitsu no mojiretsu";

export function makeJwtToken(userId: string, isAdmin: boolean) {
  const payload = {
    userId: userId,
    isAdmin: isAdmin,
  };

  const token: string = jwt.sign(
    payload, // jwtに込めたい情報を付与
    jwtSecret, // サーバー側のみ知っている秘密の文字列を付与
    {
      expiresIn: "1h", // 1時間有効
    }
  );
  return token;
}

export function verifyToken(token: string): {
  userId: string;
  isAdmin: boolean;
} {
  const jwtPayload = jwt.verify(token, jwtSecret, {
    complete: false,
  }) as jwt.JwtPayload;
  return {
    userId: jwtPayload.userId,
    isAdmin: jwtPayload.isAdmin,
  };
}

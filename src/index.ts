import express, { Request, Response } from "express";
import { makeJwtToken } from "./jwt/tokenHandler";
import { RequestWithAuth, verifyTokenMiddleware } from "./middleware/token";
import cookieParser from "cookie-parser";
import { findUser } from "./util/user";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript Server!");
});

app.get("/jwt", (req: Request, res: Response) => {
  const token = makeJwtToken("test user id", false);
  res.send(token);
});

// ログイン
app.post("/users/login", (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const user = findUser(userId);

  if (user === undefined) {
    res.status(404).json({
      message: "cannot find user",
    });
    return;
  }
  // 注意!!! ほんとは平文でパスワード保存しちゃダメだよ!!!
  if (user.password == password) {
    // 情報が詰め込まれたtokenを生成
    const token = makeJwtToken(userId, user.isAdmin);
    res.cookie("jwt", token);
    res.send("ok");
    return;
  } else {
    res.status(404).json({
      message: "invalid password",
    });
    return;
  }
});

// 呟きリスト
app.get("/contents/", (req: Request, res: Response) => {
  res.json({
    contents: "mokemoke",
  });
});

// 呟きを登録する。認証が必要。
app.get(
  "/contents/special/",
  verifyTokenMiddleware, // jwt tokenで認証を行うミドルウェア
  (req: RequestWithAuth, res: Response) => {
    res.json({
      contents: "special mokemoke",
    });
  }
);

// 呟きを登録する。認証が必要。
app.get(
  "/contents/special/admin",
  verifyTokenMiddleware, // jwt tokenで認証を行うミドルウェア
  (req: RequestWithAuth, res: Response) => {
    if (req.authData?.isAdmin) {
      res.json({
        contents: "super special mokemoke",
      });
    } else {
      res.status(403).json({
        message: "you are not admin user",
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

# jwt-test

zenn 記事：[jwt を用いたシンプルな認証機能をもつエンドポイントを作って jwt 認証の理解を深めよう](https://zenn.dev/srkr/articles/30e4dc4a1be944)
のサンプルコードです

## 環境構築

※ node の環境が必要です

### 依存関係のインストール

```bash
npm ci
```

### サーバー立ち上げ

```bash
npm run dev
```

## API 仕様

### ログイン

- method: post
- path: /users/login
- data:
  - key
    - userId: string
    - password: string
- example
  ```bash
    curl -c cookie.txt -X POST http://localhost:3000/users/login \
        -H "Content-Type: application/json" \
        -d '{
            "userId": "user1",
            "password": "user1Password"
            }'
  ```

### 一般ユーザー向けコンテンツ返却

- path: /contents
- method: get
- example
  ```bash
  curl -b cookie.txt -X GET http://localhost:3000/contents
  ```

### ログインユーザー向けコンテンツ返却

※ ログインしている必要があります。

- path: /contents/special
- method: get
- example
  ```bash
  curl -b cookie.txt -X GET http://localhost:3000/contents/special
  ```

### Admin ユーザー向けコンテンツ返却

※ Admin ユーザーで認証されている必要があります。

- path: /contents/special
- method: get
- example
  ```bash
  curl -b cookie.txt -X GET http://localhost:3000/contents/special/admin
  ```

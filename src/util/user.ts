type User = {
  id: string;
  password: string;
  isAdmin: boolean;
};
const userList: User[] = [
  { id: "user1", password: "user1Password", isAdmin: true },
  { id: "user2", password: "user2Password", isAdmin: false },
];

export function findUser(userId: string): User | undefined {
  const user = userList.find((v) => v.id === userId);
  return user;
}

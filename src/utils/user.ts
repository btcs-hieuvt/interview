import { user } from "../types/user";

const sortByUserName = (users: user[]) => {
  const newUsers = users.sort(function (a, b) {
    const nameA = a.userName.toLowerCase(),
      nameB = b.userName.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return newUsers;
};

export const listUser = (results: any) => {
  const arrayUsers: user[] = [];
  results.forEach((dataUser: any) => {
    const data: user = {
      title: dataUser.name.title,
      first: dataUser.name.first,
      last: dataUser.name.last,
      userName: dataUser.login.username,
      thumbnail: dataUser.picture.thumbnail,
    };
    arrayUsers.push(data);
  });
  return sortByUserName(arrayUsers);
};

import React from "react";
import { user } from "../types/user";

interface Props {
  users: user[];
}
function TableUser(props: Props) {
  const { users } = props;
  return (
    <div>
      <h1 className="text-3xl text-center font-bold ">List User</h1>
      <div className="flex justify-center items-center w-1/2 mx-auto my-4">
        <table className="table-auto w-full border-collapse border border-slate-400">
          <thead>
            <tr className="text-left">
              <th className="border border-slate-300 text-center p-2">
                Full Name
              </th>
              <th className="border border-slate-300 text-center p-2">
                Username
              </th>
              <th className="border border-slate-300 text-center p-2">
                Thumbnail Icon
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border border-slate-300 text-center p-4">
                  {user.title + "." + user.first + user.last}
                </td>
                <td className="border border-slate-300 text-center p-4">
                  {user.userName}
                </td>
                <td className="border border-slate-300 flex justify-center p-4 ">
                  <img src={user.thumbnail} alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableUser;

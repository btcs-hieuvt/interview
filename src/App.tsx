import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { DotLoader } from "react-spinners";
import TableUser from "./components/TableUser";
import { user } from "./types/user";
import { listUser } from "./utils/user";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://randomuser.me/api/?page=1&results=10`
      );
      if (response) {
        setLoading(false);
        const results = response.data.results;
        const arrayUsers = listUser(results);
        setUsers(arrayUsers);
      }
    };
    getUsers();
  }, []);
  const fetchUsers = async (currentPage: number) => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${currentPage}&results=10`
    );
    const data = response.data.results;
    const arrayUsers = listUser(data);

    return arrayUsers;
  };

  const handlePageClick = async (data: any) => {
    let currentPage = data.selected + 1;
    const users = await fetchUsers(currentPage);
    if (users) {
      setUsers(users);
    }
  };

  return (
    <div className="bg-indigo-600 min-h-screen">
      {!loading ? (
        <>
          <TableUser users={users} />
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={10}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center py-4"
            pageClassName="mx-2 p-2"
            activeClassName="underline"
          />
        </>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <DotLoader
            loading={loading}
            className="flex justify-center items-center"
            color="#fff"
          />
        </div>
      )}
    </div>
  );
}

export default App;

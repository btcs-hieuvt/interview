import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { DotLoader } from "react-spinners";
import TableUser from "./components/TableUser";
import { user } from "./types/user";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<user[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=10`
      );
      if (response) {
        setLoading(false);
        const results = response.data.results;
        const arrayUsers: user[] = [];
        results.map((dataUser: any) => {
          const data: user = {
            title: dataUser.name.title,
            first: dataUser.name.first,
            last: dataUser.name.last,
            userName: dataUser.login.username,
            thumbnail: dataUser.picture.thumbnail,
          };
          arrayUsers.push(data);
        });
        setUsers(arrayUsers);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected + 1);
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

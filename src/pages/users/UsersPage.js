import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import UsersList from "../../components/users/UsersList";
import { useMessage } from "../../hooks/message.hook";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const message = useMessage();
  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/user", "GET", null, {
        Authorization: `Bearer: ${token}`,
      });
      setUsers(fetched);
      message(fetched.message);
    } catch (e) {}
  }, [token, request]);
  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Users Page</h1>
      {!loading && <UsersList users={users} />}
      {/* {!loading && <LinksList users={users} />} */}
    </div>
  );
}

export default UsersPage;

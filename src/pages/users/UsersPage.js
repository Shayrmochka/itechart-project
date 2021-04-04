import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import UsersList from "../../components/users/UsersList";
import { useMessage } from "../../hooks/message.hook";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, request } = useHttp();

  const message = useMessage();
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/user", "GET", null);
      setUsers(fetched);
      message(fetched.message);
    } catch (e) {}
  }, [request]);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Users Page</h1>
      {!loading && <UsersList users={users} />}
    </div>
  );
}

export default UsersPage;

"use client";

export default function List({
  users,
  setFormData,
  setIsEditing,
  openModalForm,
}: any) {
  const handleEdit = (user: any) => {
    setIsEditing(true);
    setFormData({
      id: user.id,
      name: user.firstName,
      surname: user.lastName,
      email: user.email,
    });
  };

  const deleteUser = (e: any) => {
    console.log("User deleted");
  };

  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user: any) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => {
                    openModalForm();
                    handleEdit(user);
                  }}
                  className="btn btn-info btn-xs"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={(e) => deleteUser(e)}
                  className="btn btn-error btn-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

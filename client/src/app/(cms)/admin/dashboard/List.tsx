"use client";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function List({
  users,
  setFormData,
  setIsEditing,
  isFormShown,
  setIsFormShown,
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
    <div className="my-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-sm font-bold text-center border-b-2 border-gray-500 uppercase">
            <th className="px-4 py-3">User ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-gray-700 text-center">
          {users?.map((user: any) => {
            return (
              <tr key={user.id} className="py-10 font-medium odd:bg-gray-100">
                <td className="px-4 py-4">{user.id}</td>
                <td className="px-4 py-4"> {user.firstName}</td>
                <td className="px-4 py-4"> {user.lastName}</td>
                <td className="px-4 py-4"> {user.email}</td>
                <td className="px-4 py-4 flex gap-2 items-center justify-center">
                  <button
                    onClick={() => {
                      !isFormShown && setIsFormShown(true);
                      handleEdit(user);
                    }}
                    className="items-center px-2 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-500"
                  >
                    <FaEdit />
                  </button>{" "}
                  <button
                    onClick={(e) => deleteUser(e)}
                    className="px-2 py-2 text-white bg-red-400 rounded-md hover:bg-red-500"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

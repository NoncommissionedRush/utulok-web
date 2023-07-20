"use client";

import { useState } from "react";

import List from "./List";
import Form from "./Form";

export default function Dash({ users }: any) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);

  return (
    <>
      {!isFormShown && (
        <button
          className="px-4 py-2 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 focus:outline-none"
          onClick={() => setIsFormShown(true)}
        >
          Create dog
        </button>
      )}

      <Form
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isFormShown={isFormShown}
        setIsFormShown={setIsFormShown}
      />
      <List
        users={users}
        setFormData={setFormData}
        setIsEditing={setIsEditing}
        isFormShown={isFormShown}
        setIsFormShown={setIsFormShown}
      />
    </>
  );
}

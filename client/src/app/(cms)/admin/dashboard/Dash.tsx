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

  const openModalForm = () => {
    if (document) {
      (document.getElementById("my_modal_1") as HTMLFormElement).showModal();
    }
  };

  return (
    <>
      <Form
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        openModalForm={openModalForm}
      />
      <List
        users={users}
        setFormData={setFormData}
        setIsEditing={setIsEditing}
        openModalForm={openModalForm}
      />
    </>
  );
}

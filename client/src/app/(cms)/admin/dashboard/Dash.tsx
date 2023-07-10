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

  return (
    <>
      <Form
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <List
        users={users}
        setFormData={setFormData}
        setIsEditing={setIsEditing}
      />
    </>
  );
}

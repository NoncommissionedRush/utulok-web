"use client";

import { AiFillCloseCircle } from "react-icons/ai";

export default function Form({
  formData,
  setFormData,
  isEditing,
  setIsEditing,
  isFormShown,
  setIsFormShown,
}: any) {
  const handleInput = (e: any) => {
    //console.log(e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const updateUser = (e: any, id: any) => {
    e.preventDefault();
    console.log("User no. " + id + " updated");
    setIsEditing(false);
    resetForm();
  };

  const createUser = (e: any) => {
    e.preventDefault();
    console.log("User created");
  };

  const resetForm = () => {
    isEditing && setIsEditing(false);

    setFormData({
      id: "",
      name: "",
      surname: "",
      email: "",
    });
  };

  return (
    <>
      {isFormShown && (
        <form className="max-w-2xl border-2 border-black px-8 pt-6 pb-8 my-10 shadow-[3px_4px_0px_2px_#000]">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl mb-3">
              {isEditing ? "Uprav psíka" : "Vytvor psíka"}
            </h2>
            <AiFillCloseCircle
              className="cursor-pointer text-2xl text-red-400"
              onClick={() => {
                setIsFormShown(false);
                resetForm();
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-small mb-2" htmlFor="name">
              Meno
            </label>
            <input
              onChange={handleInput}
              value={formData.name}
              className="appearance-none border w-full py-2 px-3 focus:outline-none focus:border-slate-600"
              name="name"
              id="name"
              type="text"
              //placeholder="Vaše meno"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-small mb-2" htmlFor="surname">
              Priezvisko
            </label>
            <input
              onChange={handleInput}
              value={formData.surname}
              className="appearance-none border w-full py-2 px-3 text-small mb-3 focus:outline-none focus:border-slate-600"
              name="surname"
              id="surname"
              type="text"
              //placeholder="Telefónne číslo"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-small mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleInput}
              value={formData.email}
              className="appearance-none border w-full py-2 px-3 text-small mb-3 focus:outline-none focus:border-slate-600"
              name="email"
              id="email"
              type="email"
              //placeholder="Váš email"
              required
            />
          </div>

          <div className="flex gap-3 items-center">
            <button
              className="px-5 py-1 border-2"
              type="submit"
              //disabled={isSending}
              onClick={
                isEditing
                  ? (e) => updateUser(e, formData.id)
                  : (e) => createUser(e)
              }
            >
              {isEditing ? "Update" : "Create"}
            </button>
            {isEditing && (
              <span
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="cursor-pointer"
              >
                or cancel
              </span>
            )}
          </div>
        </form>
      )}
    </>
  );
}

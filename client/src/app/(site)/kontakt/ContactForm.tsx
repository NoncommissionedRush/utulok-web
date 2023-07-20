"use client";

import { useState } from "react";
import Spinner from "@/components/Spinner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch("https://formsubmit.co/ajax/guithead@gmail.com", {
        method: "POST",
        body: data,
      });

      const final = await res.json();

      setFormMessage("🫶 " + "Správa sa úspešne odoslala");
    } catch (error) {
      setFormMessage("Niečo sa pokazilo 😥");
      console.log(error);
    }
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

    setIsSending(false);
  };

  return (
    <form
      onSubmit={submitForm}
      className="lg:w-11/12 bg-theme-light text-theme-pink border-2 border-theme-pink rounded-2xl m-auto px-8 pt-6 pb-8 shadow-[3px_4px_0px_2px_#000]"
    >
      <div className="mb-4">
        <label className="block text-theme-pink text-small mb-2" htmlFor="name">
          Meno
        </label>
        <input
          onChange={handleInput}
          value={formData.name}
          className="appearance-none bg-theme-light border border-theme-pink rounded w-full py-2 px-3 text-theme-pink focus:outline-none focus:border-theme-yellow"
          name="name"
          id="name"
          type="text"
          //placeholder="Vaše meno"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-theme-pink text-small mb-2"
          htmlFor="phone"
        >
          Telefón
        </label>
        <input
          onChange={handleInput}
          value={formData.phone}
          className="appearance-none bg-theme-light border border-theme-pink rounded w-full py-2 px-3 text-theme-pink text-small mb-3 focus:outline-none focus:border-theme-yellow"
          name="phone"
          id="phone"
          type="text"
          //placeholder="Telefónne číslo"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-theme-pink text-small mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          onChange={handleInput}
          value={formData.email}
          className="appearance-none bg-theme-light border border-theme-pink rounded w-full py-2 px-3 text-theme-pink text-small mb-3 focus:outline-none focus:border-theme-yellow"
          name="email"
          id="email"
          type="email"
          //placeholder="Váš email"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-theme-pink text-small mb-2"
          htmlFor="message"
        >
          Správa
        </label>
        <input type="text" name="_honey" className="hidden" />
        <textarea
          onChange={handleInput}
          value={formData.message}
          className="appearance-none bg-theme-light border border-theme-pink rounded w-full py-2 px-3 text-theme-pink mb-3 focus:outline-none focus:border-theme-yellow"
          name="message"
          id="message"
          cols={30}
          rows={4}
          //placeholder="Vaša správa"
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          className="w-28 px-5 py-1 bg-theme-light text-theme-pink rounded-3xl border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light"
          type="submit"
          disabled={isSending}
        >
          {isSending ? <Spinner /> : "Odoslať"}
        </button>
        {formMessage && (
          <p className="bg-slate-100 p-3 rounded shadow-lg">{formMessage}</p>
        )}
      </div>
    </form>
  );
}

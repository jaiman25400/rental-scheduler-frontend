"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

const UserPage: any = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form ", file, name, description);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);

    if (file) {
      for (let i = 0; i < file.length; i++) {
        formData.set("file", file[i]);
      }
    }

    try {
      console.log("Form Data", formData);
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        body: formData,
      });

      console.log("Res :", response);
      if (response.ok) {
        console.log("Data successfully submitted!");
        // Reset form fields
        setName("");
        setDescription("");
        setFile(null);
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Add Your Rental Details</h1>
      </div>
      <div className="mt-4 w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-3 mb-3">
            Name:
            <input
              type="text"
              className="w-full px-4 py-2"
              placeholder="Enter property name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-3 mb-3">
            Description:
            <input
              type="text"
              className="w-full px-4 py-2 resize-none"
              placeholder="Property description"
              maxLength={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <input
            type="file"
            className="file-input w-full max-w-xs mb-3"
            onChange={(e) => setFile(e.target.files)}
            multiple
          />
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;

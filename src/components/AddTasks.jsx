import React, { useState } from "react";
import Input from "./Input";

function AddTasks({ onTaskAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="my-4 space-y-4 p-6 bg-slate-300 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button
        onClick={() => {
          // Verifica se os campos estão preenchidos
          if (!title.trim() || !description.trim()) {
            return alert("Preencha todos os campos");
          }
          onTaskAdd(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-green-500 text-white px-3 py-2 rounded-md font-medium"
      >
        Add
      </button>
    </div>
  );
}

export default AddTasks;

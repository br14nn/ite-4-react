import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [addStudentForm, setAddStudentForm] = useState<{
    name: string;
    course: string;
    age: number | null;
    subjects: string[];
  }>({
    name: "",
    course: "",
    age: null,
    subjects: [],
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addStudentForm.subjects.length == 0) {
      return alert("Please select at least one subject!");
    }
    const res = await axios.post("http://localhost:3333/students", addStudentForm);
    navigate("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setAddStudentForm((oldVal) => ({
      ...oldVal,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.currentTarget;

    if (checked) {
      setAddStudentForm((oldVal) => ({
        ...oldVal,
        subjects: [value, ...oldVal.subjects],
      }));
    } else {
      setAddStudentForm((oldVal) => {
        const newSubjects = oldVal.subjects.filter((val) => val !== value);

        return {
          ...oldVal,
          subjects: newSubjects,
        };
      });
    }
  };

  return (
    <main>
      <h1 className="text-2xl font-bold">Add a New Student</h1>
      <form
        className="flex flex-col items-center justify-center w-full max-w-[300px] gap-2"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-1 w-full">
          <label className="font-bold" htmlFor="nameInput">
            Name
          </label>
          <input
            className="rounded px-2 py-1 w-full outline-none border-2 border-white bg-gray-800/50"
            id="nameInput"
            name="name"
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            required
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-bold" htmlFor="courseInput">
            Course
          </label>
          <input
            className="rounded px-2 py-1 w-full outline-none border-2 border-white bg-gray-800/50"
            id="courseInput"
            name="course"
            type="text"
            placeholder="Enter Course"
            autoComplete="off"
            required
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="font-bold" htmlFor="ageInput">
            Age
          </label>
          <input
            className="rounded px-2 py-1 w-full outline-none border-2 border-white bg-gray-800/50"
            name="age"
            type="number"
            placeholder="Enter Age"
            autoComplete="off"
            required
            onChange={onChange}
          />
        </div>

        <ul className="flex flex-col w-full">
          <li className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="subject1"
              value="Computer Programming 1"
              onChange={onChecked}
            />
            <label htmlFor="subject1">Computer Programming 1</label>
          </li>
          <li className="flex flex-row gap-2">
            <input
              type="checkbox"
              id="subject2"
              value="Computer Programming 2"
              onChange={onChecked}
            />
            <label htmlFor="subject2">Computer Programming 2</label>
          </li>
          <li className="flex flex-row gap-2">
            <input type="checkbox" id="subject3" value="IT Elective 4" onChange={onChecked} />
            <label htmlFor="subject3">IT Elective 4</label>
          </li>
          <li className="flex flex-row gap-2">
            <input type="checkbox" id="subject4" value="IT Elective 3" onChange={onChecked} />
            <label htmlFor="subject4">IT Elective 3</label>
          </li>
        </ul>

        <button className="bg-green-700 rounded p-2">Add Student</button>
      </form>
    </main>
  );
}

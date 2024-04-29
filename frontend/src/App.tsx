import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";

export default function () {
  const [students, setStudents] = useState<{ name: string; course: string; subjects: [] }[]>();
  useEffect(() => {
    const getStudents = async () => {
      const res = await axios.get("http://localhost:3333/students");
      setStudents(res.data);
    };

    getStudents();
  }, []);

  return (
    <main>
      <table className="w-full">
        <thead className="bg-lime-600">
          <tr>
            <th className="border border-white p-4">Name</th>
            <th className="border border-white p-4">Course</th>
            <th className="border border-white p-4">Subjects</th>
          </tr>
        </thead>
        <tbody>
          {students?.map((item) => {
            return (
              <tr key={nanoid()}>
                <td className="border border-white px-4 py-2">{item.name}</td>
                <td className="border border-white px-4 py-2">{item.course}</td>

                <td className="border border-white px-4 py-2 flex flex-col">
                  {item.subjects.map((subject, id) => (
                    <span key={nanoid()}>
                      {id + 1}.&#41; {subject}{" "}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <a className="text-blue-500 underline" href="/home">
        Go To Home Page
      </a>
    </main>
  );
}

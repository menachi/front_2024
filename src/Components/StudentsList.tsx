import { useState } from "react";
import ListGroup from "./ListGroup";
import useStudents from "../hooks/useStudents";
import studentService, { CanceledError } from "../services/student-service";

function StudentList() {
  const { students, setStudents, error, setError, isLoading, setIsLoading } = useStudents();

  const [num, setNum] = useState(1000);

  const onAdd = () => {
    setIsLoading(true);
    const { request, cancel } = studentService.add({ name: "new student", _id: '' + num })
    setNum(num + 1)
    request.then((res) => {
      console.log(res.data)
      setStudents([...students, res.data])
      setIsLoading(false);
    })
    request.catch((err) => {
      setIsLoading(false);
      if (err instanceof CanceledError) return;
      console.log(err); setError(err.message)
    })
    return () => cancel();
  }

  const onUpdate = () => {
    setIsLoading(true);
    const { request, cancel } = studentService.update({ name: "update", _id: students[0]._id })
    request.then((res) => {
      setStudents(students.map((item) => item._id === res.data._id ? res.data : item))
      setIsLoading(false);
    })
    request.catch((err) => {
      setIsLoading(false);
      if (err instanceof CanceledError) return;
    })
    return () => cancel();
  }

  const onDelete = () => {
    console.log("deleting :" + students[0]._id)
    setIsLoading(true);
    const { request, cancel } = studentService.delete(students[0]._id)
    request.then(() => {
      setStudents(students.filter((item) => item._id !== students[0]._id))
      setIsLoading(false);
    })
    request.catch((err) => {
      setIsLoading(false);
      if (err instanceof CanceledError) return;
    })
    return () => cancel();
  }

  return (
    <>
      {isLoading && <div className="spinner-border text-primary" />}
      {error && <p className="text-danger">{error}</p>}
      <div>
        <ListGroup title="Students" items={students.map((item => item.name))} onItemSelected={(index) => console.log(index)} />
      </div>
      <div className="d-flex justify-content-between pt-2">
        <button className="btn btn-primary" onClick={onAdd}>Add</button>
        <button className="btn btn-primary" onClick={onUpdate}>Update</button>
        <button className="btn btn-primary" onClick={onDelete}>Delete</button>
      </div>

    </>
  );
}

export default StudentList;

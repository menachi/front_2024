import { useEffect, useState } from "react";
import studentService, { CanceledError, Student } from "../services/student-service";
const useStudents = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const { request, cancel } = studentService.getAll()
        request.then((res) => {
            setStudents(res.data);
            setIsLoading(false);
        })
        request.catch((err) => {
            setIsLoading(false);
            if (err instanceof CanceledError) return;
            console.log(err); setError(err.message)
        })
        return () => cancel();
    }, []);
    return { students, setStudents, error, setError, isLoading, setIsLoading };
}
export default useStudents




import createHttpService, { CanceledError } from "./http-service";

export { CanceledError };

export interface Student {
    _id: string;
    name: string;
}

const StudentService = createHttpService<Student>("/students");


export default StudentService;



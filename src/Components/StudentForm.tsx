import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form"
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    age: z.number({ invalid_type_error: "Age is requiered" })
        .min(18, "Age must be at least 18"),
})

type FormData = z.infer<typeof schema>

const StudentForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

    const nameRef = useRef<HTMLLabelElement>(null)
    if (nameRef.current) {
        console.log(nameRef.current)
    }


    useEffect(() => {
        console.log("connecting")
        return () => console.log("disconnecting")
    }, [])

    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label ref={nameRef} htmlFor="name" className="form-label">Name</label>
                <input {...register("name")}
                    id="name" type="text" className="form-control"></input>
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input {...register("age", { valueAsNumber: true })}
                    id="age" type="number" className="form-control"></input>
                {errors.age && <p className="text-danger">{errors.age.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default StudentForm

"use client"
import { FormSchema } from "@/schemas/dynamicFormSchema";
import { FormData, FormField } from "@/types/solidDaynamicTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";


interface DynamicFormProps {
    fields: FormField[];
    onSubmit: (data: FormData) => Promise<void> | void; // Ensure async support
  }
  
const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema), // Integrate Zod schema with React Hook Form
  });

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="p-4">
      {fields.map((field) => (
        <FieldRenderer key={field.name} field={field} register={register} errors={errors} />
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;

import { FormData, FormField } from "@/types/solidDaynamicTypes";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FieldRendererProps {
  field: FormField;
  register: UseFormRegister<FormData>;
  errors: FieldErrors;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, register, errors }) => {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
      return (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">{field.label}</label>
          <input
            {...register(field.name as keyof FormData, { required: field.required })}
            type={field.type}
            placeholder={field.placeholder}
            className={`border p-2 w-full ${
              errors[field.name] ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors[field.name] && <p className="text-red-500">This field is required</p>}
        </div>
      );
    case "select":
      return (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">{field.label}</label>
          <select
            {...register(field.name as keyof FormData, { required: field.required })}
            className={`border p-2 w-full ${
              errors[field.name] ? "border-red-500" : "border-gray-300"
            }`}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors[field.name] && <p className="text-red-500">This field is required</p>}
        </div>
      );
    case "checkbox":
      return (
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" {...register(field.name as keyof FormData)} className="mr-2" />
            {field.label}
          </label>
        </div>
      );
    default:
      return null;
  }
};

export default FieldRenderer;

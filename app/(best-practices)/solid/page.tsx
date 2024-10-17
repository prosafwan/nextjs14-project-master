import DynamicForm from "@/components/DynamicForm";
import { FormData, FormField } from "@/types/solidDaynamicTypes";

const fields: FormField[] = [
  { name: "username", label: "Username", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: false },
  { name: "password", label: "Password", type: "password", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    name: "subscribe",
    label: "Subscribe to Newsletter",
    type: "checkbox",
    required: false,
  },
];

const SolidDaynamic = () => {
  // const handleFormSubmit = () => {
  //   console.log("From Data")
  // }

  const handleFormSubmit = async (data: FormData) => {
    "use server";
    // Perform server-side logic here (e.g., save to DB)
    console.log("Server-side form submission:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Zod & TypeScript Form Example</h1>
      <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default SolidDaynamic;

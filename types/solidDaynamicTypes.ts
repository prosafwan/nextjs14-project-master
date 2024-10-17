import { FormSchema } from "@/schemas/dynamicFormSchema";
import { z } from "zod";

// Option type for dropdowns and checkboxes
export interface Option {
  value: string;
  label: string;
}

// Base interface for all fields
export interface BaseField {
  name: string;
  label: string;
  required: boolean;
}

// Specific field interfaces extending the base interface
export interface TextField extends BaseField {
  type: "text" | "email" | "password";
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: "select";
  options: Option[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

// Union type to define all valid form fields
export type FormField = TextField | SelectField | CheckboxField;

// Props for the DynamicForm component
export type DynamicFormProps = {
  fields: FormData[];
  onSubmit: (data: FormData) => void;
};

// Zod-inferred type for form data (imported from the schema)
export type FormData = z.infer<typeof FormSchema>;

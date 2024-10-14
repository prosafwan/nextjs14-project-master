"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { formSchema } from "../only-zod-optimize/validation/validation";

const OnlyZod = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  type FormData = z.infer<typeof formSchema>;

  const initialFormData: FormData = {
    name: "",
    email: "",
    age: undefined,
    dateOfBirth: "",
    country: "",
    gender: "male", // Default value for radio button
    password: "",
    confirmPassword: "",
    image: null,
    terms: false, // Checkbox for terms
    interests: [], // Array to hold selected interests
  };
  
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const validateField = (
    name: keyof FormData,
    value: string | number | File | null | undefined | boolean
  ) => {
    const updatedData = { ...formData, [name]: value };
    const result = formSchema.safeParse(updatedData);

    if (result.success) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Clear specific error
        return newErrors;
      });
    } else {
      const errorMessage = result.error.errors.find(
        (err) => err.path[0] === name
      )?.message;
      if (errorMessage) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMessage,
        }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type} = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Convert age to number if the field name is 'age'
    // const newValue = name === "age" ? Number(value) : value;
    let newValue: string | number | undefined | null | boolean = value;
    if (name === "age") {
      const numValue = Number(value);
      newValue = isNaN(numValue)
        ? undefined
        : numValue === 0
        ? undefined
        : numValue; // Reset to undefined for 0 or NaN
    }

    // For checkboxes and switches
    if (type === "checkbox") {
      newValue = checked;
      if (name === "terms") {
        setFormData((prevData) => ({
          ...prevData,
          terms: checked,
        }));
      }
    }

    // Update form data
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };
      return updatedData;
    });

    // Validate the changed field immediately
    // validateField(name, newValue);
    validateField(name as keyof FormData, newValue);

    // setFormData({
    //   ...formData,
    //   //   [e.target.name]: e.target.value,
    //   [name]: newValue,
    // });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first file or null
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Create image preview
      validateField("image", file); // Validate the image input
    } else {
      setFormData((prevData) => ({ ...prevData, image: null })); // Reset to null if no file is selected
      validateField("image", null); // Validate as null
    }
  };

  const handleMultiCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    setFormData((prevData) => {
      const interests = prevData.interests ? [...prevData.interests] : [];
      // Update interests array based on checkbox selection
      if (checked) {
        // Add the selected interest if it's checked
        if (!interests.includes(value)) {
          interests.push(value);
        }
      } else {
        // Remove the unselected interest
        const index = interests.indexOf(value);
        if (index > -1) {
          interests.splice(index, 1);
        }
      }
      return {
        ...prevData,
        interests,
      };
    });

    validateField("interests", formData.interests);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data using Zod
    const result = formSchema.safeParse(formData);
    // const result = formData;
    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      // Add custom confirmPassword validation
      //   if (formData.password !== formData.confirmPassword) {
      //     validationErrors.confirmPassword = "Passwords don't match";
      //   }
      setErrors(validationErrors);
    } else {
      console.log("Valid data:", result.data);
      setErrors({});
    }
    console.log(result);
    console.log(errors);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Register</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* <!-- Name Field --> */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* <!-- Email Field --> */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* <!-- Age Field --> */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age !== undefined ? formData.age : ""} // Keep as controlled input
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="18"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Date of Birth Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              //   value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Country Select (Dynamic) */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="country"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="BD">Bangladesh</option>
              <option value="IN">India</option>
              <option value="UK">United Kingdom</option>
              {/* Add more dynamic options here */}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>

          {/* Toggle for Notifications */}
          {/* <div className="flex items-center">
            <span className="block text-sm font-medium text-gray-700 mr-4">Notifications</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${formData.notifications ? 'translate-x-full bg-blue-600' : ''}`}></div>
            </label>
          </div> */}

          {/* Multi Checkbox for Interests */}
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Interests
            </span>
            <div className="mt-2 flex flex-col space-y-2">
              {["sports", "music", "art", "technology"].map((interest) => (
                <label key={interest} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleMultiCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Checkbox for Terms */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">
                I accept the terms and conditions
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
            )}
          </div>

          {/* <!-- Password Field --> */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Radio Buttons for Gender */}
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Gender
            </span>
            <div className="mt-2 flex space-x-4">
              {["male", "female", "other"].map((gender) => (
                <label key={gender} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Checkbox for Terms */}
          {/* <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">
                I accept the terms and conditions
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
            )}
          </div> */}

          {/* Checkbox for Notifications */}
          {/* <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Receive notifications</span>
            </label>
          </div> */}

          {/* Image Upload Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
            {imagePreview && (
              <Image
                width={200}
                height={200}
                src={imagePreview}
                alt="Image preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>

          {/* <!-- Submit Button --> */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlyZod;

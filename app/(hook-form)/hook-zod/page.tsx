"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";


type FormData = z.infer<typeof formSchema>;

const OnlyZod = () => {

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialData: FormData = {
    name: "",
    email: "",
    age: undefined,
    dateOfBirth: "",
    country: "",
    gender: "male",
    password: "",
    confirmPassword: "",
    image: null,
    terms: false,
    interests: [""],
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: FormData) => {
    console.log("Valid data:", data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue('image', e.target.files); // Save the file in form state
    //   setImagePreview(file ? URL.createObjectURL(file) : null);
    }
  };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
    
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string); // Set the preview image
//       };
//       reader.readAsDataURL(file);
//       setValue("image", e.target.files); // Set the file in form state
//     }
//   };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Register</h2>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="John Doe"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              {...register("age", { valueAsNumber: true })}
              type="number"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="18"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              {...register("dateOfBirth")}
              type="date"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              {...register("country")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select your country</option>
              <option value="US">United States</option>
              <option value="BD">Bangladesh</option>
              <option value="IN">India</option>
              <option value="UK">United Kingdom</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Interests */}
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Interests
            </span>
            {["sports", "music", "art", "technology"].map((interest) => (
              <label key={interest} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={interest}
                  {...register("interests")}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{interest}</span>
              </label>
            ))}
            {errors.interests && (
              <p className="text-red-500 text-sm mt-1">
                {errors.interests.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("terms")}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">I accept the terms and conditions</span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Gender
            </span>
            {["male", "female", "other"].map((gender) => (
              <label key={gender} className="inline-flex items-center">
                <input
                  type="radio"
                  {...register("gender")}
                  value={gender}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
          </div>

          {imagePreview && (
              <Image
                src={imagePreview}
                alt="Image Preview"
                width={100}
                height={100}
                className="mt-3"
              />
            )}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700"
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

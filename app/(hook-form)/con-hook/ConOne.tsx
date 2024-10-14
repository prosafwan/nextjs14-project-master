"use client"

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define your schema using Zod
const schema = z.object({
  category: z.enum(['fruits', 'vegetables']),
  item: z.string().min(1, 'Item is required'),
});

// Create a type from the schema
type FormData = z.infer<typeof schema>;

const ConHook: React.FC = () => {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Watch the category field to update item options conditionally
  const category = watch('category');

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const itemsOptions = {
    fruits: ['Apple', 'Banana', 'Orange'],
    vegetables: ['Carrot', 'Potato', 'Tomato'],
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="category">Category</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field} id="category">
              <option value="">Select a category</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
            </select>
          )}
        />
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="item">Item</label>
        <Controller
          name="item"
          control={control}
          render={({ field }) => (
            <select {...field} id="item">
              <option value="">Select an item</option>
              {category && itemsOptions[category].map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          )}
        />
        {errors.item && <p>{errors.item.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ConHook;

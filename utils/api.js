// utils/api.js

export async function getAllProductIds() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
  
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  }
  
export async function getProductData(id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  
    if (!res.ok) {
      return null;
    }
  
    const product = await res.json();
    return product;
  }
  
// // Fetch all blog posts
// export async function getAllPosts() {
//     const res = await fetch('https://my-blog-api.com/posts');
//     const posts = await res.json();
//     return posts;
//   }
  
//   // Fetch a single blog post by slug
// export async function getPostBySlug(slug) {
//     const res = await fetch(`https://my-blog-api.com/posts/${slug}`);
//     const post = await res.json();
//     return post || null;
//   }
  
//   // Fetch all categories
// export async function getAllCategories() {
//     const res = await fetch('https://my-blog-api.com/categories');
//     const categories = await res.json();
//     return categories;
//   }
  
//   // Fetch all authors
// export async function getAllAuthors() {
//     const res = await fetch('https://my-blog-api.com/authors');
//     const authors = await res.json();
//     return authors;
//   }

// Fetch all blog posts
export async function getAllPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts = await res.json();
  
    // Modify the response to match your schema
    return posts.map(post => ({
      id: post.id,
      slug: `post-${post.id}`, // Create a slug based on the ID
      title: post.title,
      content: post.body, // JSONPlaceholder uses 'body' for post content
      category: 'general', // Use a static category for simplicity
      author: {
        name: 'Author Name', // Placeholder name
        slug: 'author-slug', // Placeholder author slug
      }
    }));
  }
  
  // Fetch a single blog post by slug (id in JSONPlaceholder)
  export async function getPostBySlug(slug) {
    const id = slug.split('-').pop(); // Extract ID from slug (e.g., "post-1" -> 1)
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      return null; // Return null if the post is not found
    }
    const post = await res.json();
  
    // Return a post that matches your structure
    return {
      id: post.id,
      slug: `post-${post.id}`,
      title: post.title,
      content: post.body,
      category: 'general',
      author: {
        name: 'Author Name',
        slug: 'author-slug',
      }
    };
  }
  
  // Fetch all categories (for the sake of example, using static categories)
  export async function getAllCategories() {
    // JSONPlaceholder doesn't have categories, so return static categories
    return [
      { id: 1, name: 'General', slug: 'general' },
      { id: 2, name: 'Technology', slug: 'technology' }
    ];
  }
  
  // Fetch all authors (for the sake of example, using static authors)
  export async function getAllAuthors() {
    // JSONPlaceholder doesn't have authors, so return static authors
    return [
      { id: 1, name: 'John Doe', slug: 'john-doe' },
      { id: 2, name: 'Jane Smith', slug: 'jane-smith' }
    ];
  }
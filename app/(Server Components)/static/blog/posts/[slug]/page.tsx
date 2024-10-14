import { getAllPosts, getPostBySlug } from '@/utils/api';


interface postType{
  "slug":number | string | undefined, 
  "name": string,
  "category" : string,
}

// Generate static paths for each blog post
export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post:postType) => ({ slug: post.slug }));
  }

const PostPage = async ({params}:{params:{slug:number}}) => {

const post = await getPostBySlug(params?.slug);  

// Handle 404 error if post is not found
if (!post) {
    return <h1>404 - Post Not Found</h1>;
    }

return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      <p>Category: {post.category}</p>
      <div>{post.content}</div>
    </article>
  )
}

export default PostPage

export const revalidate = 600; // 10 minutes

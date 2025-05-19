import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import BlogCard from "@/components/blog/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet";

const BlogCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm">
    <Skeleton className="w-full h-[200px]" />
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </div>
);

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  return (
    <>
      <Helmet>
        <title>Healthcare Blog | CarePlus</title>
        <meta name="description" content="Stay informed with our latest articles on health tips, medical advancements, and care advice from healthcare professionals." />
      </Helmet>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-gray-900 font-heading mb-4">Healthcare Resources & Blog</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed with our latest articles on health tips, medical advancements, and care advice.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
            </div>
          ) : posts?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;

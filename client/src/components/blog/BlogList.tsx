import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";
import BlogCard from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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

const BlogList = ({ limit }: { limit?: number }) => {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });
  
  // If limit is provided, only show that many posts
  const displayPosts = limit && posts ? posts.slice(0, limit) : posts;

  return (
    <section id="blog" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Healthcare Resources & Blog</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest articles on health tips, medical advancements, and care advice.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(limit || 3)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPosts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            {limit && posts && posts.length > limit && (
              <div className="text-center mt-10">
                <Button asChild variant="outline" className="px-6 py-3 bg-white text-primary-700 border-primary-600 hover:bg-gray-50">
                  <Link href="/blog">
                    View All Articles
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogList;

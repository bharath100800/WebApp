import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const formatCategoryName = (category: string) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const BlogPostSkeleton = () => (
  <div className="max-w-3xl mx-auto">
    <Skeleton className="h-8 w-3/4 mb-4" />
    <div className="flex items-center gap-3 mb-6">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="w-full h-[400px] rounded-xl mb-8" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const BlogPostPage = () => {
  const { id } = useParams();
  const postId = parseInt(id);
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${postId}`],
    enabled: !isNaN(postId),
  });
  
  if (isNaN(postId)) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 font-heading mb-4">Invalid Blog Post</h1>
          <p className="text-lg text-gray-600 mb-8">
            The blog post ID is invalid. Please go back to the blog list and try again.
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} | CarePlus Blog</title>
          <meta name="description" content={post.summary} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.summary} />
          {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        </Helmet>
      )}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" asChild className="flex items-center gap-2">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <BlogPostSkeleton />
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load blog post. Please try again later.</p>
              <Button asChild className="mt-4">
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </div>
          ) : !post ? (
            <div className="text-center py-8">
              <p className="text-gray-800">Blog post not found.</p>
              <Button asChild className="mt-4">
                <Link href="/blog">Back to Blog</Link>
              </Button>
            </div>
          ) : (
            <article className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-4">{post.title}</h1>
              <div className="flex items-center gap-3 text-gray-500 mb-6">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  {formatCategoryName(post.category)}
                </span>
                <span>•</span>
                <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
              </div>
              
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full rounded-xl h-auto mb-8 object-cover"
                />
              )}
              
              <div className="prose prose-lg max-w-none">
                {/* Render the content paragraph by paragraph */}
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-gray-600 italic">Written by {post.author}</p>
              </div>
            </article>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPostPage;

import { format } from "date-fns";
import { Link } from "wouter";
import { BlogPost } from "@shared/schema";
import { ArrowRight } from "lucide-react";

const formatCategoryName = (category: string) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm transition hover:shadow-md">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-[200px] object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{formatCategoryName(post.category)}</span>
          <span>•</span>
          <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
        </div>
        <h3 className="text-xl font-bold font-heading mb-3">{post.title}</h3>
        <p className="text-gray-600 mb-4">
          {post.summary}
        </p>
        <Link href={`/blog/${post.id}`} className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
          Read more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

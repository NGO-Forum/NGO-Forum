import { Link } from "react-router-dom";


export default function PostCard({ post }) {
  const imgUrl = (path) => {
    if (!path) return "/images/no-image.png";
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  const dateStr = post.published_at || post.created_at;
  const date = dateStr ? new Date(dateStr) : null;
  const formattedDate = date
    ? date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="bg-white rounded-3xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden w-[280px] sm:w-[320px] lg:w-[360px]">
      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={imgUrl(post.thumbnail)}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
          {post.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-gray-700 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to={`/latest/${post.slug}`}
            className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1"
          >
            Read More
            <span className="text-lg">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

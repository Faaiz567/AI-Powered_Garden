
import Link from "next/link";

const blogPosts = [
  {
    title: "How the Plant Doctor Can Help You",
    excerpt:
      "Gardening can be incredibly rewarding, but it comes with its challenges.",
    date: "January 1, 2025",
    slug: "1",
  },
  {
    title: "Why Every Gardener Needs a Plant Identifier",
    excerpt:
      "Simplify Plant Care with Our Easy-to-Use Plant Identifier",
    date: "January 1, 2025",
    slug: "2",
  },
  {
    title: "Save Your Plants from Common Diseases",
    excerpt:
      "Quick Fixes for Common Plant Diseases Using Plant Doctor",
    date: "January 1, 2025",
    slug: "3",
  },
  {
    title: "Boost Plant Health with AI-Powered Insights",
    excerpt:
      "Smarter Plant Care Starts with Plant Doctor",
    slug: "4",
  },
  {
    title: "The Secret to Thriving Plants",
    excerpt:"Know Your Plant’s Needs for Maximum Growth. The Key to Thriving Plants? Personalized Care Tips",
    slug: "5",
  },
  {
    title: "Get Rid of Pests the Smart Way",
    excerpt:"Combat Plant Pests with Ease Using Plant Doctor. Protect Your Greenery from Pesky Invaders",
    slug: "6",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-8">Blog</h1>
        <div className="space-y-10">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{post.date}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors duration-300 font-medium"
                >
                  Read more<span aria-hidden="true"> →</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


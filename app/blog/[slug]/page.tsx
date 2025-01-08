import { notFound } from "next/navigation";
import Link from "next/link";

type BlogPostType = {
  title: string;
  content: string[];
  date?: string;
  heading: string;
  slug: string;
};

const blogPosts: BlogPostType[] = [
  {
    title:
      "Identify Any Plant with Ease!",
    content: [
      `Have you ever stumbled upon a beautiful plant but couldn’t figure out what it was? With Plant Doctor, identifying plants has never been easier. Just snap a photo, upload it, and let our AI-powered tool do the magic. Get detailed care tips, sunlight preferences, and more for your plants instantly. Start exploring the world of plants today!`,],
    date: "January 1, 2025",
    heading: "Benefits of Using the Plant Doctor Tool",
    slug: "1",
  },
  {
    title: "Why Every Gardener Needs a Plant Identifier",
    content: [
      `Identifying plants can be tricky, especially with so many species out there.
       That’s where Plant Doctor comes in! Upload a picture, and within seconds, you’ll learn your plant’s name, care tips, and unique traits. Whether you’re a gardening pro or a beginner, our tool simplifies plant care and identification.
       Try it now and grow with confidence!`
    ],
    date: "January 1, 2025",
    heading: "Needs a Plant Identifier",
    slug: "2",
  },
  {
    title: "Save Your Plants from Common Diseases",
    content: [
      `Plant diseases can strike unexpectedly, leaving your greenery looking unhealthy. With Plant Doctor, diagnosing issues like leaf spot, root rot, or powdery mildew is easy. Just take a photo of the affected area, and our tool provides instant insights and solutions.
       Don’t let plant problems go untreated—give your plants the care they deserve!`
    ],
    date: "January 1, 2025",
    heading: "Diagnose Plant Problems with Just a Photo",
    slug: "3",
  },
  {
    title: "Boost Plant Health with AI-Powered Insights",
    content: [
      `Want healthier plants? The Plant Doctor app uses advanced AI to identify plants and diagnose diseases.
       From watering tips to pest control advice, it’s like having a personal plant expert in your pocket.
        Upload an image today and transform your plant care routine into a hassle-free experience!`
    ],
    heading: "Your AI-Powered Guide to Healthier Plants",
    slug: "4",
  },
  {
    title: "The Secret to Thriving Plants",
    content: [
      `Thriving plants need proper care—and it starts with knowing their exact needs. Plant Doctor helps you identify your plants and provides tailored care advice, like ideal sunlight, watering schedules, and more.
       Whether it’s an indoor succulent or an outdoor fern, we’ve got you covered. Make plant care simple and effective!`
      ],
    heading: "Know Your Plant Needs",
    slug: "5",
  },
  {
    title: "Get Rid of Pests the Smart Way",
    content: [
      `Pests are a gardener’s nightmare, but they don’t have to be. With Plant Doctor, you can identify pests like aphids or mites and learn how to treat them effectively. Upload a photo of the damaged plant, and our tool gives you instant solutions to keep your plants pest-free.
       Say goodbye to pests and hello to healthy plants!`
      ],
    date: "January 1, 2025",
    heading: "Protect Your Greenery from Pesky Invaders",
    slug: "6",
  },
];

export default function BlogPost({ params }: { params: { slug: string } }) {

  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
              {post.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {post.date}
            </p>
            <h3 className="text-xl mb-3 font-bold text-green-600 dark:text-green-400">
              {post.heading}
            </h3>
            <div className="prose prose-green dark:prose-invert max-w-none">
              <p>{post.content}</p>
            </div>
          </div>
        </article>
        <div className="mt-8">
          <Link
            href="/blog"
            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors duration-300 font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}

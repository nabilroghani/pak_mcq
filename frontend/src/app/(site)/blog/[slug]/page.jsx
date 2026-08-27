import BlogPost from "@/Components/BlogPost";
import JsonLd from "@/seo/JsonLd";
import FaqSchema from "@/seo/FaqSchema";
import { buildBreadcrumbSchema } from "@/seo/buildBreadcrumbSchema";
import { absoluteUrl, siteConfig } from "@/data/siteConfig";
import { blogPosts, getBlogPost } from "@/data/blogPosts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const canonical = `/blog/${post.slug}`;
  const titleBase = post.metaTitle.replace(/\s*\|\s*PakLearners\s*$/i, "").trim();

  return {
    title: {
      absolute: `${titleBase} | PakLearners`,
    },
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${titleBase} | PakLearners`,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleBase} | PakLearners`,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        id={`schema-webpage-blog-${post.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: post.headline,
          url: pageUrl,
          description: post.metaDescription,
          isPartOf: { "@id": absoluteUrl("/#organization") },
        }}
      />
      <JsonLd
        id={`schema-article-blog-${post.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.headline,
          description: post.excerpt,
          author: { "@type": "Organization", name: post.author },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: absoluteUrl("/"),
            logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logoPath) },
          },
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          mainEntityOfPage: pageUrl,
          articleSection: post.category,
          keywords: post.tags?.join(", "),
        }}
      />
      <JsonLd id={`schema-breadcrumb-blog-${post.slug}`} data={buildBreadcrumbSchema(breadcrumbs)} />
      {post.faqs?.length > 0 && (
        <FaqSchema id={`schema-faq-blog-${post.slug}`} faqs={post.faqs} />
      )}
      <BlogPost post={post} />
    </>
  );
}

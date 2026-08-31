/** Shared Next.js metadata builder with canonical URL and social tags. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogType = "website",
  robots,
}) {
  const metadata = {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | PakLearners`,
      description,
      url: path,
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PakLearners`,
      description,
    },
  };

  if (robots) {
    metadata.robots = robots;
  }

  return metadata;
}

/** Metadata for exam-style pillar pages (/mcqs/:slug, /past-papers/:slug, etc.). */
export function buildExamPillarMetadata(exam, basePath, titleLabel) {
  return buildPageMetadata({
    title: `${exam.name} ${titleLabel}`,
    description: exam.description,
    path: `${basePath}/${exam.slug}`,
  });
}

/** Metadata for map-based topic pillars (/current-affairs/:slug, etc.). */
export function buildTopicPillarMetadata(item, basePath) {
  return buildPageMetadata({
    title: item.headline,
    description: item.description,
    path: `${basePath}/${item.slug}`,
  });
}

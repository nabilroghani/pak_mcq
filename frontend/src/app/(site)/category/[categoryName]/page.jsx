import MCQS_cart from "@/Components/MCQS_cart";
import { buildCategoryMetadata } from "@/seo/categoryMetadata";

export async function generateMetadata({ params }) {
  const { categoryName } = await params;
  return buildCategoryMetadata(categoryName);
}

export default function Page() {
  return <MCQS_cart />;
}

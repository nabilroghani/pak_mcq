import OrganizationSchema from "@/seo/OrganizationSchema";
import LocalBusinessSchema from "@/seo/LocalBusinessSchema";
import ServicesSchema from "@/seo/ServicesSchema";

/** Site-wide schemas — each type is a separate script tag */
export default function GlobalSchemas() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <ServicesSchema />
    </>
  );
}

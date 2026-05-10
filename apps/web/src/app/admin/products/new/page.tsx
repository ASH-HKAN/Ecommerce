import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export const metadata = { title: "New product" };

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>
      <AdminPageHeader
        eyebrow="Catalog"
        title="New product"
        description="Add a new SKU. The full editor with sections and validations lives here in production."
      />
      <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
        <Wrench className="mx-auto size-7 text-muted-foreground" />
        <p className="mt-3 font-medium">Editor placeholder</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The full add/edit form goes here with Basics, Pricing, Inventory,
          Categorization, Media, Specifications, Compatibility, and SEO sections.
        </p>
      </div>
    </div>
  );
}

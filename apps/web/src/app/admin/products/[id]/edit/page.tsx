import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

type Props = { params: { id: string } };

export function generateMetadata({ params }: Props) {
  return { title: `Edit ${params.id}` };
}

export default function EditProductPage({ params }: Props) {
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
        eyebrow={`Editing ${params.id.toUpperCase()}`}
        title="Edit product"
        description="Update fields and publish. Saves are audit logged."
      />
      <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
        <Wrench className="mx-auto size-7 text-muted-foreground" />
        <p className="mt-3 font-medium">Editor placeholder</p>
      </div>
    </div>
  );
}

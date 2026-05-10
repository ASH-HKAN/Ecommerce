import { brands } from "@/data/mocks";

export function TopBrands() {
  return (
    <section className="border-b bg-muted/40 py-12 lg:py-16">
      <div className="container">
        <p className="mb-6 text-center text-eyebrow uppercase text-muted-foreground">
          Trusted by mechanics across 80+ brands
        </p>
        <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-8">
          {brands.map((b) => (
            <li
              key={b.id}
              className="text-center font-display text-sm font-bold tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {b.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

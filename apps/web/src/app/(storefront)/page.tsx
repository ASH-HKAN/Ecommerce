import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { DealOfTheWeek } from "@/components/home/deal-of-the-week";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { ReservationExplainer } from "@/components/home/reservation-explainer";
import { TopBrands } from "@/components/home/top-brands";
import { EditorsPicks } from "@/components/home/editors-picks";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <DealOfTheWeek />
      <WhyChooseUs />
      <ReservationExplainer />
      <TopBrands />
      <EditorsPicks />
      <Testimonials />
      <Newsletter />
    </>
  );
}

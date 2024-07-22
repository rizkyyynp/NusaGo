import CardActivity from "@/components/Activity/CardActivity";
import CardCategories from "@/components/Categories/CardCategories";
import CardPromo from "@/components/Promo/CardPromo";
import Reason from "@/components/Reason/Reason";
import Layout from "@/layouts/Layout";
import Hero from "@/components/Hero/Hero";
import { fetchPromos, fetchCategories, fetchActivities } from "@/lib/api";


export default function Home({initialPromos, initialCategories, initialActivities}) {
  return (
    <Layout>
    <Hero />
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl lg:text-3xl font-bold text-primary mb-8 font-podkova pl-16 pr-2 lg:px-0">Why Choose NusaGo?</h2>
          <Reason />
        </div>
      </section>
      <CardPromo initialItems={initialPromos} />
      <CardCategories initialItems={initialCategories} />
      <CardActivity initialItems={initialActivities} />
    </Layout>
  );
}


export async function getServerSideProps() {
  const [initialPromos, initialCategories, initialActivities] = await Promise.all([fetchPromos(), fetchCategories(), fetchActivities()]);

  return {
      props: {
          initialPromos,
          initialCategories,
          initialActivities,
      },
  };
}
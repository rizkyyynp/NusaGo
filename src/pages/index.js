import CardActivity from "@/components/cardUser/CardActivity";
import CardCategories from "@/components/cardUser/CardCategories";
import CardPromo from "@/components/cardUser/CardPromo";
import Reason from "@/components/Reason/Reason";
import Layout from "@/layout/Layout";
import Hero from "@/components/Hero/Hero";
import { fetchPromos, fetchCategories, fetchActivities, fetchBanners } from "@/lib/api";
import React from 'react';
import { useSelector } from 'react-redux';


export default function Home({ initialBanners, initialPromos, initialCategories, initialActivities }) {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <Layout>
      <Hero initialItems={initialBanners} />
      <section className={`${darkMode ? 'bg-dark1' : 'bg-zinc-100'} p-8`}>
        <div className="container mx-auto flex flex-col justify-center items-center mb-6 mt-16 md:mt-0">
          <h2 className={`${darkMode ? 'text-secondary' : 'text-primary'} text-center text-2xl lg:text-3xl font-bold  mb-8 font-podkova`}>Why Choose NusaGo?</h2>
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
  const [initialBanners, initialPromos, initialCategories, initialActivities] = await Promise.all([fetchBanners(), fetchPromos(), fetchCategories(), fetchActivities()]);

  return {
    props: {
      initialBanners,
      initialPromos,
      initialCategories,
      initialActivities,
    },
  };
}
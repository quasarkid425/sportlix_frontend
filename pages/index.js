import React from "react";
import Hero from "../components/Layout/Hero";
import HowItWorks from "../components/Layout/HowItWorks";
import Meals from "../components/Layout/Meals";
import Testimonials from "../components/Layout/Testimonials";
import Features from "../components/Layout/Features";
import Cta from "../components/Layout/Cta";
import Head from "next/head";
import { bestsellerFeatured } from "../actions/products";

// export async function getServerSideProps(context) {
//   const data = await bestsellerFeatured();

//   return {
//     props: {
//       products: data,
//     },
//   };
// }

const Index = ({ products }) => {
  return (
    <>
      <Head>
        <title>Sportlix</title>

        {/* <meta name="description" content={product.desc} /> */}
      </Head>
      <Hero />
      <HowItWorks />
      <Meals />
      <Testimonials />
      <Features />
      <Cta />
    </>
  );
};

export default Index;

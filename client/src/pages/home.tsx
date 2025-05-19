import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import BlogList from "@/components/blog/BlogList";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>CarePlus - Professional Home Healthcare Services</title>
        <meta name="description" content="Experience personalized medical care in the comfort of your home. Our team of qualified healthcare professionals is dedicated to providing quality care when and where you need it." />
      </Helmet>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <BlogList limit={3} />
      <CTASection />
    </>
  );
};

export default Home;

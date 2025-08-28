"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with a diverse range of clients, from startups and small businesses to large enterprises across various industries. Our strategies are tailored to meet the unique needs and goals of each business, regardless of size.",
  },
  {
    question: "How long does it take to see results from SEO?",
    answer:
      "SEO is a long-term strategy. While some improvements can be seen within a few weeks, it typically takes 4-6 months to see significant, sustainable results. The timeline can vary based on your industry's competitiveness, your website's history, and the scope of the campaign.",
  },
  {
    question: "Do you offer custom web and app development services?",
    answer:
      "Yes, absolutely. Beyond digital marketing, we have a skilled development team that specializes in creating custom websites, e-commerce platforms, and mobile applications tailored to your specific business requirements.",
  },
  {
    question: "How do you measure the success of a marketing campaign?",
    answer:
      "We measure success using a variety of key performance indicators (KPIs) that are relevant to your goals. This includes metrics like website traffic, conversion rates, return on ad spend (ROAS), cost per acquisition (CPA), and overall revenue growth. We provide regular, transparent reports to track our progress.",
  },
  {
    question: "What is included in your social media marketing services?",
    answer:
      "Our social media services include strategy development, content creation (graphics and copy), community management, paid advertising campaigns, and detailed performance analytics. We manage your presence across platforms like Facebook, Instagram, LinkedIn, and more to build brand awareness and drive engagement.",
  },
  {
    question: "Can I request a service that is not listed on your website?",
    answer:
      "Yes. We offer custom development and tailored marketing solutions. If you have a specific need that isn't listed, please get in touch through our contact form. We'd be happy to discuss your project and see how we can help.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions? We have answers. Here are some of the most common
          inquiries we receive.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="glass-card mb-4 px-6 rounded-lg border-primary/20">
              <AccordionTrigger className="text-left text-lg font-semibold text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;

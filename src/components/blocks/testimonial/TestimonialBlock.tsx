import { TestimonialBlock as TestimonialBlockType } from "@/types/payload";
import Image from "next/image";
import TestimonialCarousel from "./TestimonialCarousel";

const TestimonialBlock: React.FC<TestimonialBlockType> = ({
  blockType,
  testimonials,
  description,
  title,
  priority = 'below'
}) => {
  const isAbove = priority === 'above';

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto text-center">
        { title && <h2 className="text-3xl font-bold text-center mb-10">{title}</h2> }
        { description && <p className="mt-4 text-gray-600">{description}</p> }
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  )
}

export default TestimonialBlock;
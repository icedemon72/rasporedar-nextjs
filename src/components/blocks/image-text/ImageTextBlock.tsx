import { ImageTextBlock as ImageTextBlockType } from "@/types/payload";
import { toHTML } from "@/utils/serializeLexical";
import clsx from "clsx";
import Image from "next/image";

const ImageTextBlock: React.FC<ImageTextBlockType> = ({
  priority,
  imagePosition,
  image,
  title,
  content,
}) => {
  const isAbove = priority === 'above';

  return (
    <section
      className={clsx(
        "flex flex-col md:flex-row items-start gap-8 py-16 max-w-4xl mx-auto",
        imagePosition === "right" && "md:flex-row-reverse"
      )}
    >
      <Image
        width={image.width}
        height={image.height}
        loading={isAbove ? 'eager' : 'lazy'}
        fetchPriority={isAbove ? 'high' : 'auto'}
        priority={isAbove}
        src={image.url}
        alt={image.alt || title || ''} 
        className="w-full md:w-1/2 rounded-lg"
      />
      
      <div className="w-full md:w-1/2 py-4">
        { title && <h2 className="text-3xl font-bold mb-4">{title}</h2> }
        {
          content && (
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: toHTML(content) }}
            />
          )
        }
      </div>
    </section>
  )
};

export default ImageTextBlock;
import { IFooter } from "@/types/payload";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FooterProps extends IFooter {

}

const Footer: React.FC<FooterProps> = ({
  buttonSection,
  contactSection,
  copyright,
  linksSection,
  staticPages
}) => {
  return (
    <footer className="bg-black  text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {
          buttonSection && (buttonSection.title || buttonSection.button) && (
            <div>
              {buttonSection.title && (
                <h3 className="text-xl font-semibold mb-2">{buttonSection.title}</h3>
              )}
              {buttonSection.button && (
                <Link
                  href={buttonSection.button.url}
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {buttonSection.button.label}
                </Link>
              )}
            </div>
          )
        }

        {
          linksSection && linksSection?.length > 0 && (
            <div>
              <ul className="space-y-2">
                {linksSection.map((link, i) => (
                  <li key={i}>
                    <Link href={link.url} className="hover:underline text-gray-300 font-semibold flex justify-between items-center">
                      {link.label}
                      <ChevronRight size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        {
          contactSection && contactSection?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Contact</h4>
              <ul className="space-y-4">
                {contactSection.map((contact, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    {/* Icon */}
                    <Image
                      src={contact.icon.url}
                      alt={contact.icon.alt || 'icon'}
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium">{contact.title}</p>
                      {contact.subtitle && (
                        <p className="text-sm text-gray-400">{contact.subtitle}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
        {
          staticPages && staticPages?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Legal</h4>
              <ul className="space-y-2">
                {staticPages.map((page, i) => {
                  const pageObj = typeof page.page === 'object' ? page.page : null;
                  const slug = pageObj?.slug ?? '#';
                  return (
                    <li key={i}>
                      <Link href={`/${slug}`} className="hover:underline text-gray-300">
                        {page.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        }
      </div>

      {
        copyright && (
          <div className="mt-12 text-sm text-gray-500">
            {copyright}
          </div>
        )
      }
    </footer>
  );
};

export default Footer;
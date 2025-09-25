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
    <footer className="border-t px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {
          buttonSection && (buttonSection.title || buttonSection.button) && (
            <div>
              {buttonSection.title && (
                <h3 className="text-xl font-semibold mb-2">{buttonSection.title}</h3>
              )}
              {buttonSection.button && (
                <Link
                  href={buttonSection.button.url}
                  className="inline-block mt-2 px-4 py-2 btn-primary"
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
                    <Link href={link.url} className="font-semibold flex justify-between items-center">
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
                        <p className="text-sm">{contact.subtitle}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
      <div className="flex w-full flex-col lg:flex-row justify-between items-center mt-12 gap-6">
        {
          copyright && (
            <div className="text-sm text-gray-500">
              {copyright}
            </div>
          )
        }
        {
           staticPages && staticPages?.length > 0 && (
            <div className="w-full flex-1 flex flex-col lg:flex-row justify-end gap-4">
              {
                staticPages.map((page, i) => (
                  <Link key={i} href={`${page.page}`} className="w-full lg:w-auto hover:underline text-gray-500 flex justify-between items-center">
                    {page.label}
                    <ChevronRight className="lg:hidden" size={12} />
                  </Link>
                )) 
              }
            </div>
           )
        }
      </div>

    </footer>
  );
};

export default Footer;
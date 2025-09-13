import React from 'react';
import ContactForm from './ContactForm';
import { toHTML } from '@/utils/serializeLexical';
import { ContactFormBlock as ContactFormBlockType } from '@/types/payload';

export const ContactFormBlock: React.FC<ContactFormBlockType> = ({ 
  title, subtitle, icons, tags
 }) => {

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 max-w-6xl mx-auto">
      {/* Left Side */}
      <div className="space-y-6 order-2 lg:order-1">
        { title && <h2 className="text-3xl font-bold">{title}</h2> }

        {
          subtitle && (
            <div className="prose main" dangerouslySetInnerHTML={{ __html: toHTML(subtitle) }} />
          )
        }

        {
        icons && icons?.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {
                icons.map((iconItem, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    {
                      iconItem.icon?.url && (
                        <img
                          width={16}
                          height={16}
                          src={iconItem.icon.url}
                          alt={iconItem.icon.alt || 'Icon'}
                          className="w-4 h-4 object-contain"
                        />
                      )
                    }
                    <div className="prose text-sm contact-icons" dangerouslySetInnerHTML={{ __html: toHTML(iconItem.text) }} />
                  </div>
                ))
              }
            </div>
          )
        }
      </div>

      {/* Right Side: Contact Form */}
      <div className="order-1 lg:order-2">
        <ContactForm tags={tags || []} />
      </div>
    </section>
  );
};

export default ContactFormBlock;

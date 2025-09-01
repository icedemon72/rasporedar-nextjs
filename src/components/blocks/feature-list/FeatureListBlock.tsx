import { FeatureListBlock as FeatureListBlockType } from "@/types/payload";

const FeatureListBlock: React.FC<FeatureListBlockType> = ({ sectionTitle, features }) => {
  return  (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto">
        {sectionTitle && (
          <h2 className="text-3xl font-bold text-center mb-10">{sectionTitle}</h2>
        )}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm border"
            >
              {f.icon && (
                <img src={f.icon.url} alt={f.title} className="w-12 h-12 mb-4" />
              )}
              <h3 className="text-xl font-semibold">{f.title}</h3>
              {f.description && <p className="mt-2 text-gray-600">{f.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeatureListBlock;
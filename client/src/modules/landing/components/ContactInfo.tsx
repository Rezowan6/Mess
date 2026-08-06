import { ContactInfoCard } from "@/shared/components/ui/ContactInfoCard";
import { contactInfoItems } from "../configs/contact-info.config";

export const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold md:text-4xl">Get In Touch</h2>

      <p className="mt-4 max-w-lg text-base-content/70">
        Have questions or need help? Contact us and our team will assist you.
      </p>

      <div className="mt-8 space-y-5">
        {contactInfoItems.map((item) => (
          <ContactInfoCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};

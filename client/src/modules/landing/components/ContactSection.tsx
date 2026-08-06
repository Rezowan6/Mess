import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export const ContactSection = () => {
  return (
    <section id="contact" className="bg-success/5 px-6 py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <ContactInfo />

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

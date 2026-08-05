import { Mail, MapPin, Phone } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="bg-base-200 px-6 py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Get In Touch</h2>

            <p className="mt-4 max-w-lg text-base-content/70">
              Have questions or need help? Contact us and our team will assist
              you.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Mail size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">Email</h4>

                  <p className="text-sm text-base-content/70">
                    support@messmanagement.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Phone size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">Phone</h4>

                  <p className="text-sm text-base-content/70">
                    +880 1234-567890
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <MapPin size={22} />
                </div>

                <div>
                  <h4 className="font-semibold">Location</h4>

                  <p className="text-sm text-base-content/70">Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />

              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered h-32 w-full"
              />

              <button className="btn btn-primary w-full">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

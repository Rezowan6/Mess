import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { Send } from "lucide-react";

export const ContactForm = () => {
  return (
    <div className="rounded-2xl bg-info/10 p-6 shadow-sm">
      <div className="space-y-4">
        <Input type="text" placeholder="Your Name" />

        <Input type="email" placeholder="Your Email" />

        <Textarea rows={6} placeholder="Write your message..." />

        <Button
          variant="accent"
          rightIcon={<Send size={14} />}
          className="w-full"
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

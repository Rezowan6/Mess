import { Mail, MapPin, Phone } from "lucide-react";

export const contactInfoItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@messmanagement.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1234-567890",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bangladesh",
  },
] as const;

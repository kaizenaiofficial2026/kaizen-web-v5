import { redirect } from "next/navigation";
import { services } from "@/lib/content/services";

export default function ServicesPage() {
  redirect(services[0].href);
}

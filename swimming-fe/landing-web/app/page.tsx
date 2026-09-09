import { getHomepageData } from "../lib/api-client";
import HeroBanner from "../components/HeroBanner";
import EventInfoSection from "../components/EventInfoSection";
import RegistrationFormSection from "../components/RegistrationFormSection";
import StatusCheckerSection from "../components/StatusCheckerSection";

export const revalidate = 0;

export default async function HomePage() {
  const data = await getHomepageData();
  const banners = data?.data?.banners || [];
  const events = data?.data?.events || [];

  return (
    <>
      <HeroBanner banners={banners} />
      <EventInfoSection events={events} />
      <RegistrationFormSection events={events} />
      <StatusCheckerSection />
    </>
  );
}

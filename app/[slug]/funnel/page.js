import PropertyFunnelForm from "./components/PropertyFunnel";


export const metadata = {
  title: "Property Inquiry | DNK Real Estate",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FunnelPage() {
  return <PropertyFunnelForm />;
}
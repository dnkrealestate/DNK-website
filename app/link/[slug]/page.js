
import React from 'react'
import FormRoadshow from './components/FormRoadshow'
import ClientsideLinkPort from './components/ClintSildeLinkPort'
import { userRoadshowServices } from "@/services/roadshowService";


export async function generateMetadata({ params }) {
  const { getRoadshowLinkById } = userRoadshowServices();
  const response = await getRoadshowLinkById(params.slug);

  if (response.success && response.data) {
    const place = response.data.place;
    return {
      title: `Registration | DNK Real Estate Dubai`,
      openGraph: {
        url: `https://www.dnkre.com/link/${place}`,
        title: "Registration | DNK Real Estate Dubai",
        description:
          "Discover the best offplan projects in Dubai with DNK Real Estate. Explore a wide range of apartments, villas, townhouses, and penthouses in prime locations. Invest in your dream property today!",
        images: [
          {
            url: "https://drive.google.com/u/0/drive-viewer/AKGpihaaWoPLjYUq9VHdklrE9MMaaPftvHzrGxNhyWMiX4OM8NPla-ejwmlawfT5fvI00gd1vh-y3fuyCEZc3YwBqAqQ-989KeHUG1A=s1600-rw-v1",
            width: 1200,
            height: 630,
            alt: "DNK Real Estate Properties",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Registration | DNK Real Estate Dubai",
        description:
          "Discover the best offplan projects in Dubai with DNK Real Estate. Explore a wide range of apartments, villas, townhouses, and penthouses in prime locations. Invest in your dream property today!",
        images: ["https://www.dnkre.com/favicon.ico"],
      },
    };
  }

  return {
    title: "Registration | DNK Real Estate Dubai",
  };
}

export default function Linkpage() {
  return (
    <>
       <ClientsideLinkPort />
      </>
  )
}
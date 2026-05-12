"use client";

import dynamic from "next/dynamic";

const DestinationMap = dynamic(
  () => import("./destination-map").then((m) => m.DestinationMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full animate-pulse rounded-[24px] bg-muted" />
    ),
  },
);

export function DestinationMapLoader(props: {
  lat: number;
  lng: number;
  name: string;
  location: string;
}) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-border">
      <DestinationMap {...props} />
    </div>
  );
}

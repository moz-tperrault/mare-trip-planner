export default async function TripMessagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <h1>Messages for trip {id}</h1>;
}

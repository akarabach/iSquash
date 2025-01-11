import { getPublicEvents } from '@/actions/events.actions';

export default async function Home() {
  const  [data] = await getPublicEvents()

  console.log(data);
  return (
    <nav className="flex items-center">
      {JSON.stringify(data.data)}
    </nav>
  );
}

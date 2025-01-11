import { getPublicEvents } from '@/actions/events.actions';

export default async function Home() {
  const [data] = await getPublicEvents();
  return (
    <div className="flex flex-col">
      <h1 className="my-10 flex justify-center text-7xl">
        Easy&nbsp;<span className="bg-blue-50">organise</span>&nbsp;tournament
        <br />
        with our platform
      </h1>

      <div className="flex flex-col">
        <h3>Upcoming Events</h3>
        <div className="flex flex-col">
          {data?.data?.map(d => {
            return (
              <div className="flex flex-row" key={d.id}>
                <div>{d.id}</div>
                <div>{d.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

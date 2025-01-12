import { getPublicEvents } from '@/actions/events.actions';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const [data] = await getPublicEvents();
  return (
    <div className="flex flex-col">
      <h1 className="my-10 flex flex-col items-center text-7xl">
        <div className="flex flex-row">
          <span>Easy</span>
          <div className="relative mx-2.5 px-0.5">
            organize
            <div className="absolute top-2 h-full w-full bg-blue-600 opacity-30" />
            <div className="absolute bottom-0 left-0 top-2 h-full w-0.5 bg-blue-600">
              <div className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600" />
            </div>
            <div className="absolute -right-0.5 bottom-0 top-2 h-full w-0.5 bg-blue-600">
              <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-600" />
            </div>
          </div>
          tournament
        </div>
        <div className="my-2">with our platform</div>
      </h1>

      <div>
        <Button>Start tournament</Button>
        <Button>Explore tournaments</Button>
      </div>
      <div className="grid grid-cols-2">
        <div className="bg-amber-200">
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

        <div>smth else </div>
      </div>
    </div>
  );
}

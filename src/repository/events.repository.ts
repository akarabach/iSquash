import { createServClient } from '@/lib/supabase-server';

const eventsRepository = {
  async getPublicEvents() {
    const s = await createServClient();
    return s.from('event').select().eq('public', true);
  },
};

export default eventsRepository;

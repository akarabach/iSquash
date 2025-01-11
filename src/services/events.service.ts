import eventsRepository from '@/repository/events.repository';

const eventsService = {
  async getPublicEvents() {
    return eventsRepository.getPublicEvents();
  },
};

export default eventsService;

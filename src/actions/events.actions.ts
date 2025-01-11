'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import eventsService from '@/services/events.service';

export const getPublicEvents = unauthenticatedAction
  .createServerAction()
  .handler(async () => {
    return eventsService.getPublicEvents();
  });
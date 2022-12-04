import { DomainEvent } from "app/src/entity/domain-event";
import { publishEvent } from "app/src/adapters/events";

// this is the repository which the domain calls to utilise the adapter
// only working with domain entities, and translating dto's from the secondary adapters
// domain --> (repository) --> adapter
export async function publishDomainEvents(
  events: DomainEvent[]
): Promise<void> {
  const eventsToPublish: Promise<void>[] = events.map((item) =>
    publishEvent(
      item.event,
      item.eventName,
      item.source,
      item.eventVersion,
      item.eventDateTime
    )
  );
  await Promise.all(eventsToPublish);
}

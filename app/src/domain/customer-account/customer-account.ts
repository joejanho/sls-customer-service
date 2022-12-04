import * as customerAccountCreatedEvent from "app/src/events/customer-account-created";
import * as customerAccountUpdatedEvent from "app/src/events/customer-account-updated";

import {
  CreateCustomerAccountProps,
  NewCustomerAccountProps,
} from "app/src/models/customer-account-types";

import { AggregateRoot } from "app/src/entity/aggregate-root";
import { CustomerAccountDto } from "app/src/dto/customer-account";
import { DomainEvent } from "app/src/entity/domain-event";
import { schema } from "app/src/schemas/customer-account.schema";

export class CustomerAccount extends AggregateRoot<CreateCustomerAccountProps> {
  private constructor({
    id,
    created,
    updated,
    ...props
  }: CreateCustomerAccountProps) {
    super(props, id, created, updated);
  }

  public retrieveDomainEvents(): DomainEvent[] {
    const existingEvents = [...this.domainEvents];

    // clear down the existing events on the queue
    this.clearDomainEvents();

    return existingEvents;
  }

  public static createAccount(props: NewCustomerAccountProps): CustomerAccount {
    const customerAccountProps: CreateCustomerAccountProps = {
      firstName: props.firstName,
      surname: props.surname,
    };

    const instance: CustomerAccount = new CustomerAccount(customerAccountProps);
    instance.validate(schema);

    instance.addDomainEvent({
      event: instance.toDto(),
      eventName: customerAccountCreatedEvent.eventName,
      source: customerAccountCreatedEvent.eventSource,
      eventSchema: customerAccountCreatedEvent.eventSchema,
      eventVersion: customerAccountCreatedEvent.eventVersion,
    });

    return instance;
  }

  public toDto(): CustomerAccountDto {
    return {
      id: this.id,
      created: this.created,
      updated: this.updated,
      firstName: this.props.firstName,
      surname: this.props.surname,
    };
  }

  public static toDomain(raw: CustomerAccountDto): CustomerAccount {
    const instance = new CustomerAccount({
      ...raw,
    });
    return instance;
  }
}

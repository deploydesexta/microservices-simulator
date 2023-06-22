'use client';
import { nanoid } from 'nanoid';
import { groupBy } from 'lodash';
import useEvents from '@/store/event-emitter';
import Dropdown, { DropdownItem } from "@/components/ui-kit/dropdown-menu";

const services: DropdownItem[] = [
  { id: 'monolith', name: 'Monolith', group: 'applications' },
  { id: 'microservice', name: 'Microservice', group: 'applications' },
  { id: 'loadbalancer', name: 'Load Balancer', group: 'applications' },
  { id: 'documentdb', name: 'Document DB', group: 'databases' },
  { id: 'kvs', name: 'Key Value Store', group: 'databases' },
  { id: 'rdbms', name: 'RDBMS', group: 'databases' },
  { id: 'cron', name: 'Cron Job', group: 'job' },
  { id: 'kafka', name: 'Kafka', group: 'streaming' },
  { id: 'kinesis', name: 'Kinesis', group: 'streaming' },
  { id: 'rabbitmq', name: 'RabbitMQ', group: 'messaging' },
  { id: 'sqs', name: 'AWS SQS', group: 'messaging' },
];


function Library() {
  const { emit } = useEvents();

  const onClick = (service: DropdownItem) => {
    const data = { id: nanoid(3), type: service.id, label: service.name };

    switch (service.group) {
      case 'applications': emit('add_application', data); break;
      case 'databases': emit('add_database', data); break;
      case 'job': emit('add_job', data); break;
    }
  };

  return (
    <Dropdown
      items={groupBy(services, 'group')} 
      onClick={onClick}
    />
  );
}

export default Library;

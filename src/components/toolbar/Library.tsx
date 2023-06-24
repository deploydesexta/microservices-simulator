'use client';
import { nanoid } from 'nanoid';
import { groupBy } from 'lodash';
import Dropdown, { DropdownItem } from "@/components/ui-kit/dropdown-menu";
import useStateManager from '@/sketch/useStateManager';

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
  const { addNode } = useStateManager();

  const onClick = (service: DropdownItem) => {
    addNode({ id: nanoid(3), type: service.id, label: service.name });
  };

  return (
    <Dropdown
      items={groupBy(services, 'group')} 
      onClick={onClick}
    />
  );
}

export default Library;

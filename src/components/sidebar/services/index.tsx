import { capitalize, groupBy } from 'lodash';
import { nanoid } from 'nanoid';
import useStateManager from '@/sketch/useStateManager';
import './services.css';

type ServiceItem = {
  id: string;
  name: string;
  group: string;
};

type ServiceGroupProps = {
  name: string;
  onClick: (service: ServiceItem) => void;
  services: ServiceItem[];
};

const services: ServiceItem[] = [
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

const serviceGroups = groupBy(services, 'group');

const ServiceGroup = ({ name, onClick, services }: ServiceGroupProps) => {
  return (
    <div>
      <b>{capitalize(name)}</b>
      {services.map((service) => (
        <div className="d-grid col-12 py-1" key={service.id}>
          <button 
            className="btn btn-primary btn-sm btn-block btn-services"
            onClick={() => onClick(service)}
          >
            {service.name}
          </button>
        </div>
      ))}
    </div>
  )
};

const Services = () => {
  const { addNode } = useStateManager();

  const onClick = (service: ServiceItem) => {
    addNode({ id: nanoid(3), type: service.id, label: service.name });
  };

  return (
    <div className="container">
      <div className="row">
        {Object.keys(serviceGroups).map((group: string) => (
          <div className="col-12 gy-3" key={group}>
            <ServiceGroup
              name={group}
              onClick={onClick}
              services={serviceGroups[group]}
            />
          </div>  
        ))}
      </div>
    </div>
  );
}

export default Services;

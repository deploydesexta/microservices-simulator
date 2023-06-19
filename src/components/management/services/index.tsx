import { capitalize, groupBy } from 'lodash';
import { nanoid } from 'nanoid';
import useEvents from '../../../store/event-emitter';
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
  { id: 'documentdb', name: 'Document DB', group: 'databases' },
  { id: 'kvs', name: 'Key Value Store', group: 'databases' },
  { id: 'rdbms', name: 'RDBMS', group: 'databases' },
  { id: 'monolith', name: 'Monolith', group: 'applications' },
  { id: 'microservice', name: 'Microservice', group: 'applications' },
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
        <div className="col-12" key={service.id}>
          <button 
            className="btn btn-primary btn-sm btn-services"
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
  const { emit } = useEvents();

  const onClick = (service: ServiceItem) => {
    const data = { id: nanoid(3), type: service.id, name: service.name };

    switch (service.group) {
      case 'applications': emit('add_application', data); break;
      case 'databases': emit('add_database', data); break;
    }
  };

  return (
    <div>
      <h1>Services</h1>
      <div className="row">
        {Object.keys(serviceGroups).map((group: string) => (
          <div className="col-12 col-md-4 gy-3" key={group}>
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

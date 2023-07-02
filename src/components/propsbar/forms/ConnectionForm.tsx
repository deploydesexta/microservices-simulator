import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/ui-kit/input';
import useStateManager from '@/sketch/useStateManager';
import { Tag } from 'lucide-react';
import { Connection } from '@/sketch/models/Connection';
import Button from '@/components/ui-kit/button';

const Schema = z.object({
  predicates: z.array(z.object({
    property: z.string(),
    value: z.string(),
  })),
});

type FormData = z.infer<typeof Schema>

type ConnectionFormProps = {
  connection: Connection;
}

const ConnectionForm = ({ connection }: ConnectionFormProps) => {
  const initialValue = {
    predicates: connection.predicates || [],
  };
  
  const { updateConnection } = useStateManager();
  
  const { register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values: initialValue,
  })

  const onChange = (attr: string, value: any) => {
    updateConnection({ id: connection.id, [attr]: value });
  };
  
  const onAdd = () => {
    updateConnection({ id: connection.id, predicates: [
      ...connection.predicates, 
      { property: '', value: '' }
    ]});
  }

  return (
    <form
      className={'form'}
      data-testid="login-form"
    >
      {initialValue.predicates.map((predicate, index) => (
        <div key={index}>
          <div className="row">
            <div className="col">
              <Input
                className="mb-3"
                label={<Tag size={16} />}
                name={`predicates.${index}.value`}
                errors={errors}
                register={register}
                onChange={onChange}
              />
            </div>
            <div className="col">
              <Input
                className="mb-3"
                label={<Tag size={16} />}
                name={`predicates.${index}.property`}
                errors={errors}
                register={register}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="d-grid gap-2 col-12 py-3">
        <Button
          className="btn btn-secondary btn-sm"
          onClick={() => onAdd()}
          type="button"
        >
          Add predicate
        </Button>
      </div>
    </form>
  );
};

export default ConnectionForm;
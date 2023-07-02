import {nanoid} from 'nanoid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/ui-kit/input';
import { Database } from '@/sketch/models/Database';
import useStateManager from '@/sketch/useStateManager';
import { Tag } from 'lucide-react';

const Schema = z.object({
  id: z.string(),
  label: z.string()
    .nonempty('A label is required'),
});

type FormData = z.infer<typeof Schema>

type DatabaseFormProps = {
  node: Database;
}

const DatabaseForm = ({ node }: DatabaseFormProps) => {
  const initialValue = {
    id: node.id || nanoid(3),
    label: node.label || '',
  };
  
  const { updateNode } = useStateManager();

  const { register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values: initialValue,
  })
  
  const onChange = (attr: string, value: any) => {
    updateNode({ id: node.id, [attr]: value });
  };

  return (
    <form
      className={'form'}
      data-testid="login-form"
    >
      <Input
        className="mb-3"
        label={<Tag size={16} />}
        name="label"
        errors={errors}
        register={register}
        onChange={onChange}
      />
    </form>
  );
};

export default DatabaseForm;
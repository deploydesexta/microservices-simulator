import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/ui-kit/input';
import Button from '@/components/ui-kit/button';
import { Application } from '@/sketch/models/application';
import useStateManager from '@/sketch/useStateManager';
import { Tag } from 'lucide-react';

const Schema = z.object({
  id: z.string(),
  label: z.string().nonempty('A label is required'),
});

type FormData = z.infer<typeof Schema>

type ApplicationFormProps = {
  node: Application;
}

const ApplicationForm = ({ node }: ApplicationFormProps) => {
  const values = {
    id: node.id,
    label: node.label,
  };

  const { sendRequest, updateNode } = useStateManager();

  const { register, formState: { errors, ...rest } } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values,
    mode: "onChange",
  })

  const onSendRequest = () => {
    sendRequest({ from: node.id })
  };
  
  const onChange = (attr: string, value: any) => {
    updateNode({ id: node.id, [attr]: value });
  };

  return (
    <form
      className={'form'}
      data-testid="login-form"
    >
      <Input
        label={<Tag size={16} />}
        name="label"
        errors={errors}
        register={register}
        onChange={onChange}
      />
      <div className="d-grid gap-2 col-12 py-3">
        <Button
          className="btn btn-secondary btn-sm"
          onClick={() => onSendRequest()}
          type="button"
        >
          Send request
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
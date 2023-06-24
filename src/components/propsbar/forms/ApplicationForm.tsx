import {nanoid} from 'nanoid';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/ui-kit/input';
import Button from '@/components/ui-kit/button';
import { Application } from '@/sketch/models/application';
import useStateManager from '@/sketch/useStateManager';
import { Tag } from 'lucide-react';

const Schema = z.object({
  id: z.string(),
  label: z.string()
    .nonempty('A label is required'),
  x: z.number()
    .nonnegative('X must be a positive number'),
  y: z.number()
    .nonnegative('Y must be a positive number'),
  width: z.number()
    .nonnegative('Width must be a positive number'),
  height: z.number()
    .nonnegative('Height must be a positive number'),
});

type FormData = z.infer<typeof Schema>

type ApplicationFormProps = {
  node: Application;
}

const ApplicationForm = ({ node }: ApplicationFormProps) => {
  const values = {
    id: node.id,
    label: node.label,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
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
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Input
            label="X"
            name="x"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <Input
            label="Y"
            name="y"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Input
            label="W"
            name="width"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
        <div className="col-sm-12 col-md-6">
          <Input
            label="H"
            name="height"
            type='number'
            errors={errors}
            register={register}
            onChange={onChange}
          />
        </div>
      </div>

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
import type { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<FormData extends FieldValues> = {
  className?: string;
  errors: FieldErrors<FormData>;
  label: string;
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  type?: string;
};

// The following component is an example of your existing Input Component
const Input = <FormData extends FieldValues>(
  { className = '', errors, label, name, register, type = 'text' }: InputProps<FormData>
) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} className={`${className} form-control`} {...register(name)} />
    {errors[name] && <span>{errors[name]?.message?.toString()}</span>}
  </div>
);

export default Input;

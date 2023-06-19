
type Option = {
  label: string;
  value: string;
}

type SelectProps = {
  className?: string;
  label: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const Select = ({ className = '', label, name, onChange, options, value }: SelectProps) => (
  <div className="form-group">
    <label>{label}</label>

    <select
      className={['form-select', className].join(' ')}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option>Select...</option>
      {options.map(({ value: optValue, label }) => (
        <option key={value} value={optValue}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;

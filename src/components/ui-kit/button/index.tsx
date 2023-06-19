type BtnProps = {
  className: string;
  children: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (ev: React.SyntheticEvent) => void;
  type?: 'button' | 'reset' | 'submit';
};

const Spinner = () => (
  <>
    <span className="spinner-border spinner-border-sm text-light mh-2" role="status"></span>
    <span className="visually-hidden">Carregando...</span>
  </>
);

// The following component is an example of your existing Input Component
const Button = ({
  className,
  children,
  disabled = false,
  loading = false,
  onClick,
  type = 'button'
}: BtnProps) => (
  <>
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </button>
  </>
);

export default Button;

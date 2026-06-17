import { Icon } from './Icon';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  soft: 'btn-soft',
};

export function Button({
  children,
  variant = 'primary',
  size,
  icon,
  iconRight,
  onClick,
  type = 'button',
  disabled,
  style,
  className = '',
  ...rest
}) {
  const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.primary;
  const sizeClass = size ? `btn-${size}` : '';
  const iconSize = size === 'sm' ? 14 : 16;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      style={{ opacity: disabled ? 0.5 : 1, ...style }}
      {...rest}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </button>
  );
}

import classNames from 'classnames';

interface SkillTagProps {
  text: string;
  onClick?: () => void;
}

export default function SkillTag({ text, onClick }: SkillTagProps) {
  const tagClasses = classNames(
    'font-bold px-3 py-1 rounded text-sm cursor-pointer transition-colors',
    'bg-neutral-tablets text-primary',
    'hover:bg-primary hover:text-white'
  );

  return (
    <span 
      className={tagClasses}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
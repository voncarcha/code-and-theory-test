import classNames from "classnames";
import Image from "next/image";

interface FilterTagProps {
  text: string;
  onRemove: (filter: string) => void;
}

export default function FilterTag({ text, onRemove }: FilterTagProps) {
  const tagClasses = classNames(
    "font-bold pl-3 flex items-center overflow-hidden rounded text-sm cursor-pointer transition-colors",
    "bg-neutral-tablets text-primary"
  );

  return (
    <span className={tagClasses}>
      {text}
      <button 
        className="w-[29px] h-[29px] ml-2 bg-primary flex items-center justify-center cursor-pointer hover:bg-neutral-very-dark"
        onClick={() => onRemove(text)}
      >
        <Image
          src="/images/icon-remove.svg"
          alt="remove"
          width={14}
          height={14}
        />
      </button>
    </span>
  );
}

type CheckboxProps = {
  option: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({ option, handleChange }: CheckboxProps) {
  return (
    <div>
      <label className="flex justify-between items-center px-1 py-2 cursor-pointer">
        <span className="text-sm text-theme-pink">{option}</span>
        <div className="relative flex">
          <input
            type="checkbox"
            value={option}
            onChange={handleChange}
            className="peer appearance-none shrink-0 w-5 h-5 rounded-md border-2 border-theme-pink-light mt-1 bg-theme-light
        focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-theme-pink
        checked:bg-theme-pink checked:border-0"
          />
          <svg
            className="absolute w-5 h-5 pointer-events-none hidden peer-checked:block stroke-theme-light mt-1 outline-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </label>
    </div>
  );
}

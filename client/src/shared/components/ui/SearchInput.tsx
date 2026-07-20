interface Props {
  value: string;

  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <input
      className="input"
      placeholder="Search member..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

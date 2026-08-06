interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion = ({ title, children, defaultOpen = false }: Props) => {
  return (
    <div className="collapse collapse-plus border border-base-300 bg-info/5">
      <input type="checkbox" defaultChecked={defaultOpen} />

      <div className="collapse-title text-lg font-semibold">{title}</div>

      <div className="collapse-content text-sm text-base-content/70">
        {children}
      </div>
    </div>
  );
};

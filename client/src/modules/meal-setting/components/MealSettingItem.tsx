interface Props {
  title: string;

  items: {
    label: string;
    value: string | number | React.ReactNode;
  }[];
}

export const MealSettingItem = ({ title, items }: Props) => {
  return (
    <div>
      <h3 className="font-medium text-success">{title}</h3>

      {items.map((item) => (
        <p key={item.label} className="text-sm">
          {item.label}: {item.value}
        </p>
      ))}
    </div>
  );
};

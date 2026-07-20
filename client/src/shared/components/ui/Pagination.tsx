interface Props {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex gap-2">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>

      <span>
        {page}/{totalPages}
      </span>

      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

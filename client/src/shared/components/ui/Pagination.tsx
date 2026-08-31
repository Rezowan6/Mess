interface Props {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-primary/20 hover:text-accent disabled:pointer-events-none disabled:opacity-40"
      >
        Prev
      </button>

      <span>
        {page}/{totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-9 items-center justify-center rounded-md border border-primary/40 bg-primary/10 px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-primary/20 hover:text-accent disabled:pointer-events-none disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};
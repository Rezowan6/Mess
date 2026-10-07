interface Props {
  page: number;

  totalPages: number;

  onChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-9 items-center justify-center rounded-theme-md border border-theme-border bg-theme-brand-soft px-4 text-sm font-medium text-theme-text shadow-theme-sm transition-all duration-200 hover:bg-theme-brand-subtle hover:text-theme-accent disabled:pointer-events-none disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm text-theme-text-secondary">
        {page}/{totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-9 items-center justify-center rounded-theme-md border border-theme-border bg-theme-brand-soft px-4 text-sm font-medium text-theme-text shadow-theme-sm transition-all duration-200 hover:bg-theme-brand-subtle hover:text-theme-accent disabled:pointer-events-none disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

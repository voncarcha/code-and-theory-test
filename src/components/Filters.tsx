import React from "react";
import FilterTag from "./FilterTag";

interface FiltersProps {
  filters: string[];
  removeFilter: (filter: string) => void;
  clearAllFilters: () => void;
}

const Filters = ({ filters, removeFilter, clearAllFilters }: FiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg py-6 px-8 mt-[-85px] mb-[40px] flex justify-between items-center">
      <section className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <FilterTag key={filter} text={filter} onRemove={removeFilter} />
        ))}
      </section>
      <section>
        <button 
          className="text-primary underline cursor-pointer hover:text-neutral-very-dark transition-colors"
          onClick={clearAllFilters}
        >
          Clear
        </button>
      </section>
    </div>
  );
};

export default Filters;

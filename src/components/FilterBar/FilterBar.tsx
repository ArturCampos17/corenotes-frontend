import React, { useState } from "react";
import styles from "./FilterBar.module.scss";
import { FaSearch } from "react-icons/fa";

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  onSearchChange,
}) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className={styles.filterBar}>
      <select
        value={filter}
        onChange={handleFilterChange}
        className={styles.filterSelect}
      >
        <option value="all">Todos</option>
        <option value="favorite">Favoritas</option>
        <option value="pending">Pendentes</option>
        <option value="completed">Finalizadas</option>
        <option value="canceled">Canceladas</option>
      </select>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar tarefas..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
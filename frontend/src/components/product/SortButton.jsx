import { DropdownButton, Dropdown } from "react-bootstrap";
import { SORT_TYPES } from "../../constants";
import { useParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils";

const SortButton = () => {
  const { keyword, category, sort: urlSort } = useParams();
  const getCategoryBtnTitle = () => {
    if (urlSort) {
      const currentSort = SORT_TYPES.find((sort) => sort.value === urlSort);
      const currentSortLabel = currentSort?.label;
      return `Sort: ${currentSortLabel}`;
    }
    return "Sort: Newest";
  };

  const redirectHandler = (sort) => {
    redirectProductSearch({ keyword, category, sort });
  };

  return (
    <DropdownButton
      variant="outline-secondary"
      id="dropdown-outlined-button text-capitalize"
      title={getCategoryBtnTitle()}
    >
      {SORT_TYPES.map((sort) => (
        <Dropdown.Item
          key={sort.value}
          className="text-capitalize"
          onClick={() => redirectHandler(sort.value)}
          active={urlSort === sort.value}
        >
          {sort.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default SortButton;

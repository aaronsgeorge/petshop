import { DropdownButton, Dropdown } from "react-bootstrap";
import { CATEGORY_TYPES } from "../../constants";
import { useParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils";

const CategoryButton = () => {
  const { keyword, category } = useParams();
  const getCategoryBtnTitle = () => {
    if (category) {
      return `Category: ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }`;
    }
    return "Select Category";
  };

  const redirectHandler = (category) => {
    redirectProductSearch({ keyword, category });
  };

  return (
    <DropdownButton
      variant="outline-secondary"
      id="dropdown-outlined-button text-capitalize"
      title={getCategoryBtnTitle()}
    >
      <Dropdown.Item
        key="categoryAll"
        className="text-capitalize text-primary"
        onClick={() => redirectHandler("")}
      >
        All
      </Dropdown.Item>
      {CATEGORY_TYPES.map((category) => (
        <Dropdown.Item
          key={category}
          className="text-capitalize"
          onClick={() => redirectHandler(category)}
        >
          {category}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CategoryButton;

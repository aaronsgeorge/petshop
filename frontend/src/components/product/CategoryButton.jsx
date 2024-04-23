import { DropdownButton, Dropdown } from "react-bootstrap";
import { CATEGORY_TYPES } from "../../constants";
import { useParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils";

const CategoryButton = () => {
  const { keyword, category: urlCategory } = useParams();
  const getCategoryBtnTitle = () => {
    if (urlCategory) {
      return `Category: ${
        urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)
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
        onClick={() => redirectHandler("")}
        active={!urlCategory}
      >
        All
      </Dropdown.Item>
      {CATEGORY_TYPES.map((category) => (
        <Dropdown.Item
          key={category}
          className="text-capitalize"
          onClick={() => redirectHandler(category)}
          active={urlCategory === category}
        >
          {category}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CategoryButton;

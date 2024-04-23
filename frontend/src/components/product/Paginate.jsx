import { Pagination } from "react-bootstrap";
import { redirectProductSearch } from "../../utils/navigationUtils.js";

const Paginate = ({ pages, page, keyword = "", category = "" }) => {
  const onClickHandler = (x) => {
    redirectProductSearch({ keyword, category, pageNumber: x + 1 });
  };

  return (
    <>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <Pagination.Item
              key={`Pagination${x + 1}`}
              active={x + 1 === page}
              onClick={() => onClickHandler(x)}
            >
              {x + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default Paginate;

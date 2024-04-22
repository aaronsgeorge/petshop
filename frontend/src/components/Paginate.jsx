import { Pagination } from "react-bootstrap";

const Paginate = ({ pages, page, keyword = "" }) => {
  
  function generateHref(x) {
    return keyword ? `/search/${keyword}/page/${x + 1}` : `/products/${x + 1}`;
  }

  return (
    <>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <Pagination.Item
              key={`Pagination${x + 1}`}
              active={x + 1 === page}
              href={generateHref(x)}
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

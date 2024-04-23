export const redirectProductSearch = ({
  keyword,
  category,
  sort,
  pageNumber = 1,
}) => {
  const keywordPath = keyword ? `/${keyword}` : "";
  const categoryPath = category ? `/category/${category}` : "/category";
  const sortPath = sort ? `/sort/${sort}` : "/sort/createdAt:desc";
  window.location.href = `/search${keywordPath}${categoryPath}${sortPath}/page/${pageNumber}`;
};

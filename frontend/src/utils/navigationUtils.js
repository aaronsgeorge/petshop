export const redirectProductSearch = ({
  keyword,
  category,
  pageNumber= 1,
}) => {
  const keywordPath = keyword ? `/${keyword}` : "";
  const categoryPath = category ? `/category/${category}` : "/category";
  window.location.href = `/search${keywordPath}${categoryPath}/sort/createdAt/page/${pageNumber}`;
};

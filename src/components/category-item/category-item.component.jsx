import "./category-item.style.scss";

import PropTypes from "prop-types";

const CategoryItem = ({ category: { id, title, imageUrl } }) => {
  return (
    <div
      key={id}
      className="min-w-[30%] h-60 flex flex-auto items-center justify-center border-[1px] border-black my-0 mr-2 ml-4 overflow-hidden"
    >
      <div className="" style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

export default CategoryItem;

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const CategoryItem = ({ category: { id, title, imageUrl, route } }) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  console.log(route);

  return (
    <div
      key={id}
      onClick={onNavigateHandler}
      className="min-w-[30%] h-60 flex flex-auto items-center justify-center border-[1px] border-black my-0 mr-4 mb-4 overflow-hidden hover:cursor-pointer"
    >
      <div
        className="w-full h-full duration-200 bg-center bg-cover hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute flex flex-col items-center justify-center h-24 px-6 bg-white opacity-70 hover:opacity-90 ">
        <h2 className="text-xl font-bold">{title.toUpperCase()}</h2>
        <p className="text-base font-light">Shop Now</p>
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

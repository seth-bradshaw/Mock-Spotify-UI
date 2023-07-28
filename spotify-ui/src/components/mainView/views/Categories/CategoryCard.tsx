import React from "react";
import { useDispatch } from "../../../../store/hooks";
import fetchCategoryPlaylists from "../../../../store/slices/categories/fetchCategoryPlaylists";
import { Link } from "react-router-dom";

type Props = {
  category: any;
};

export default function CategoryCard({ category }: Props) {

  return (
    <Link to={`/home/genre/${category.id}`}>
      <div
        className="w-40 h-40 lg:w-52 lg:h-52 text-center text-sm lg:text-lg bg-contain bg-center rounded-lg hover:cursor-pointer p-2"
        style={{ backgroundImage: `url('${category.icons[0].url}')` }}
      >
        <span className='text-white font-bold'>
            {category.name}
        </span>
      </div>
    </Link>
  );
}

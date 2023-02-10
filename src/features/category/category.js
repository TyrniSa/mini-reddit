import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, selectCategory } from "./categorySlice";
import './category.css'
import icon from '../../images/icon.jpg'
import { getSubReddit } from "../post/postSlice";

export const Category = () => {
  const categories = useSelector(selectCategory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  return (
    <ul className="categoryUl">
      {
      categories.map((category) => (
      <li key = {category.id} className = 'categoryLi'>
        <img src= {category.icon_img || icon} alt= {category.display_name_prefixed} className = 'categoryIcon' />
        <button onClick={() => dispatch(getSubReddit(category.display_name))}>{category.display_name_prefixed}</button>
      </li>
      ))
      }

    </ul>
  )
}
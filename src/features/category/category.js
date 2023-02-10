import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, selectCategory } from "./categorySlice";
import './category.css'
import icon from '../../images/icon.jpg'
import { getSubReddit } from "../post/postSlice";
import { getPost } from '../post/postSlice';

export const Category = () => {
  const categories = useSelector(selectCategory)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  return (
    <ul className="categoryUl">
      <li key ="all" className = 'categoryLi'>
        <img src= {icon} alt="choose all" className = 'categoryIcon' />
        <button onClick={() => dispatch(getPost())}>all</button>
      </li>
      <li key ="popular" className = 'categoryLi'>
        <img src= {icon} alt="choose popular" className = 'categoryIcon' />
        <button onClick={() => dispatch(getSubReddit("Popular"))}>r/Popular</button>
      </li>
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
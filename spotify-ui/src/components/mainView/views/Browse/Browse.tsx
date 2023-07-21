import React from 'react'
import ViewWrapper from '../ViewLayout/ViewWrapper'
import { useSelector, useDispatch } from '../../../../store/hooks'
import { getCategories } from '../../../../store/slices/categories/categories.selectors'
import fetchCategoryPlaylists from '../../../../store/slices/categories/fetchCategoryPlaylists'
import { Link } from 'react-router-dom'

type Props = {}

export default function Home({}: Props) {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();

  const fetchPlaylists = (id: string)  => {
    dispatch(fetchCategoryPlaylists(id))
  }

  const handleCategoryClick = (id: string) => {
    fetchPlaylists(id)

  }

  return (
    <ViewWrapper isLoading={false}>
        <div className="h-full w-full">
            {categories.map((c) => {
              return (
                <Link to={'playlist'} onClick={() => handleCategoryClick(c.id)} className='color-red-600'>
                  {c.name}
                </Link>
              )
            })}
        </div>
    </ViewWrapper>
  )
}
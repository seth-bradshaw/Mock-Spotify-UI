import React, { useEffect } from 'react'
import { getCategories, getCategoriesPagination } from '../../../../store/slices/categories/categories.selectors'
import { useDispatch, useSelector } from '../../../../store/hooks';
import CategoryCard from './CategoryCard';
import fetchCategories from '../../../../store/slices/categories/fetchCategories';
import GridWrapper from '../../../common/GridWrapper';

type Props = {}

export default function SearchCategories({}: Props) {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories);
    const {offset, total} = useSelector(getCategoriesPagination);
    
    const handlePagination = () => {
        dispatch(fetchCategories({offset}));
    }

    useEffect(() => {
        if (categories.length === 0) {
            handlePagination()
        }
    }, [])

    return (
        <div className='h-full w-full'>
            <GridWrapper>
                {
                    categories.map((category) => 
                        <CategoryCard category={category} />
                    )
                }
            </GridWrapper>
            {
                categories.length < total && (
                    <div className='w-full text-center mt-6'>
                        <button className="text-white hover:cursor bg-spotify-gray-650 p-2 rounded-full" onClick={() => handlePagination()}>See more</button>
                    </div>
                )
            }
        </div>
    )
}
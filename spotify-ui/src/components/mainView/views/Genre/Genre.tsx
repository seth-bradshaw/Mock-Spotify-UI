import { useEffect } from 'react'
import PlaylistsContainer from './PlaylistsContainer'
import { useParams } from 'react-router';
import { useDispatch } from '../../../../store/hooks';
import fetchCategoryPlaylists from '../../../../store/slices/categories/fetchCategoryPlaylists';
import { useCategory } from '../../../../store/slices/categories/useCategory';

type Props = {}

export default function Genre({}: Props) {
    const dispatch = useDispatch();
    const { categoryid = "" } = useParams();
    const category = useCategory(categoryid);


    const handlePagination = () => {
        dispatch(fetchCategoryPlaylists({id: categoryid, offset: category?.offset ?? 0, limit: category?.limit ?? 20}));
    }

    useEffect(() => {
        if (!category?.items || category?.items?.length !== category?.total) {
            dispatch(fetchCategoryPlaylists({id: categoryid, offset: category?.offset ?? 0, limit:category?.limit ?? 20}))
        }
    }, [categoryid])

    return category && (
        <div className="w-full h-full p-4 bg-gradient-to-b from-indigo-500 from-10% via-spotify-gray-900 via-10% to-spotify-gray-900 to-90%">
            <div className="h-64 w-full my-10 flex justify-between">
                <div className="flex items-end">
                    <h3 className="text-8xl text-white font-bold">{category.name}</h3>
                </div>
                <div className="rounded-full bg-contain bg-center w-60 h-60" style={{ backgroundImage: `url('${category.icons[0].url}')` }}>
                </div>
            </div>
            <PlaylistsContainer playlists={category.items} />
            {
                category?.items?.length < category?.total && (
                <div className='w-full text-center mt-6'>
                    <button className="text-white hover:cursor bg-spotify-gray-650 p-2 rounded-full" onClick={() => handlePagination()}>See more</button>
                </div>
                )
            }
        </div>
  )
}
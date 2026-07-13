import Skeleton from 'react-loading-skeleton'
export default function CardSkeleton({cardItems}) {
    const skeletonItems = Array(cardItems).fill(0);
    return skeletonItems.map((_, index) => (
        <li
        className="text-sm sm:text-base flex gap-4 items-center p-4"
        key={index}
        >
            <Skeleton circle width={48} height={48} />
            <Skeleton count={1.7} containerClassName="flex-1" />
        </li>
    ));
}

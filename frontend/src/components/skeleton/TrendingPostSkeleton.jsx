import Skeleton from "react-loading-skeleton";

export function TrendingPostSkeleton() {
    return (
        <div className='px-5 py-4 shadow-sm'>
            <Skeleton height={20} width='85%' />
            <div className='flex gap-2 items-center my-1 w-full'>
                <Skeleton circle height={20} width={20} />
                <Skeleton height={14} width={70} />
                <Skeleton height={14} width={90} />
            </div>
        </div>
    )
}
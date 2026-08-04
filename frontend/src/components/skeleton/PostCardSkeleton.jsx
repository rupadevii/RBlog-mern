import Skeleton from "react-loading-skeleton";

export function PostCardSkeleton() {
    return (
        <div className='p-5 shadow-lg w-full flex gap-4 justify-between items-center'>
            <div className='flex-7 w-full'>
                <Skeleton height={28} width='70%' className='my-1' />
                <Skeleton height={16} width='95%' />
                <Skeleton height={16} width='80%' />
                <div className='mt-3 flex items-center gap-5'>
                    <div className='flex gap-2 items-center'>
                        <Skeleton circle height={32} width={32} />
                        <Skeleton height={14} width={80} />
                    </div>
                    <Skeleton height={14} width={100} />
                </div>
            </div>
            <div className='flex-2 hidden sm:block'>
                <Skeleton height={108} width={160} />
            </div>
        </div>
    )
}
export const formattedDate = (createdAt) => {
    const date = new Date(createdAt)
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}
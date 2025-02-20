const formatDate = (date: string) => {
    const newDate = new Date(date);

    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    // const year = newDate.getFullYear();

    return `${day}/${month}`;

}


export { formatDate };
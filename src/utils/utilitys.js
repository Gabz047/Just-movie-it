export const adjusteSize = (item, lenght, index) => {
    if (item.length > lenght && item != '') {
        item = item.replace(item.substring(index), '') + '...'
    }
    return item
}
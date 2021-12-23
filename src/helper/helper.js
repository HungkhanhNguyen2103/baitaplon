export const findItem = (list, id) => {
    const arr = list.filter(sitem => sitem.idtuyenxe === id);
    if (arr.length > 0) {
        return arr[0];
    }
    else {
        return null;
    }
}

//chuyen obj route sang obj select-react 
export const findValue = (list, id) => {
    const arr = list.filter(sitem => sitem.value === id);
    if (arr.length > 0) {
        return arr[0];
    }
    else {
        return null;
    }
}
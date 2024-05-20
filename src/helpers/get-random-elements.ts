export function getRandomElements<T>(iterable: T[], cnt: number, initialValue?: T): T[] {
    const filteredIterable = iterable.filter(item => item !== initialValue);

    if (cnt > filteredIterable.length) {
        throw new Error("Count cannot be greater than the number of elements in the iterable.");
    }
    
    const shuffled = filteredIterable.slice().sort(() => Math.random() - 0.5);

    const result = shuffled.slice(0, cnt)

    if(initialValue !== undefined) {
        result.push(initialValue);
    }

    return result
}
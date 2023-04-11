
export function getValueFromLocalStorage<T>(key: string): T | null {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item) as T
        }
        return null;
    } else {
        return null;
    }
}
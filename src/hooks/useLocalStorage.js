import config from '../config';

const useLocalStorage = () => {
    const keyLocal = config.keyLocal.key;

    const getItems = () => {
        const dataStorage = JSON.parse(localStorage.getItem(keyLocal)) ?? {};

        return dataStorage;
    };

    const setItems = (newObj) => {
        const prevData = getItems();

        const merge = Object.assign(prevData, newObj);

        localStorage.setItem(keyLocal, JSON.stringify(merge));
    };

    const removeItems = () => {
        return localStorage.removeItem(keyLocal);
    };

    const clearLocal = () => {
        localStorage.clear();
    };

    return { getItems, setItems, removeItems, clearLocal };
};

export default useLocalStorage;

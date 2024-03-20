import { atom } from 'recoil';

export const SelectedYear = atom({
    key: 'selectedYear',
    default: new Date().getFullYear(),
});

export const SelectedFactoryId = atom({
    key: 'SelectedFactoryIdState',
    default: null
});

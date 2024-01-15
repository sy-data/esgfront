import { atom } from 'recoil';

export const SelectedYear = atom({
    key: 'selectedYear',
    default: '2024'
});

export const SelectedFactoryId = atom({
    key: 'SelectedFactoryIdState',
    default: null
});

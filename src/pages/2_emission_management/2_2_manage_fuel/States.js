import { atom } from 'recoil';

export const UserCompanyId = atom({
    key: 'userCompanyId',
    default: null
});

export const SelectedYear = atom({
    key: 'selectedYear',
    default: '2024'
});

export const SelectedFactoryId = atom({
    key: 'SelectedFactoryIdState',
    default: null
});

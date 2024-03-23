import { atom } from 'recoil';

export const SelectedFormular = atom({
    key: 'selectedFormular',
    default: null
});

export const SelectedFuels = atom({
    key: 'selectedFuels',
    default: null
});

export const SelectedMappingFuels = atom({
    key: 'selectedMappingFuels',
    default: null
});

export const MappingFuelChangeFlag = atom({
    key: 'mappingFuelChangeFlag',
    default: false
});
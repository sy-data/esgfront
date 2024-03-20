import { atom, selector } from 'recoil';

export const activeStep = atom({
    key: 'activeStep',
    default: 0
});

export const signupFormState = atom({
    key: 'signupThirdFormState',
    default: {
        companyName: {value: '', error: true, errorText: '회사명을 입력하세요'},
        companyCategory: {value: null, error: true, errorText: '회사 구분을 선택하세요'},
        country: {value: null, error: true, errorText: '국가를 선택하세요'},
        bizNumber: {value: '', error: true, errorText: '사업자 등록번호를 입력하세요', required: true},
        foreignerBizNumber: {value: '', error: false},
        companyNumber: {value: '', error: false, errorText: '법인 등록번호를 정확히 입력하세요'},
        representiveName: {value: '', error: true, errorText: '대표자명을 입력하세요.'},
        managerName: {value: '', error: false},
        zoneCode: {value: '', error: true, errorText: '주소를 입력하세요.'},
        address: {value: '', error: true, errorText: '주소를 입력하세요.'},
        addressDetail: {value: '', error: true, errorText: '상세주소를 입력하세요.'},
        representivePhone: {value: '', error: true, errorText: '대표자 전화번호를 입력하세요.'},
        fax: {value: '', error: false},
        representiveEmail: {value: '', error: true, errorText: '대표자 E-mail을 입력하세요.'},
        homepage: {value: '', error: false},
        bizSector: {value: '', error: false},
        bizType: {value: '', error: false},
        mainItem: {value: '', error: true, errorText: '주거래 품목을 입력하세요.'},
        companyScale: {value: null, error: false},
        id: {value: '', error: true, errorText: '아이디를 입력하세요.'},
        password: {value: '', error: true, errorText: '비밀번호를 정확히 입력하세요.'},
        passwordCheck: {value: '', error: true, errorText: '비밀번호 확인을 정확히 입력하세요.'},
        managerPhone: {value: '', error: true, errorText: '담당자 전화번호를 입력하세요.'},
    }
})

export const signupSecondFormState = atom({
    key: 'signupSecondFormState',
    default: {
        firstCheck: false,
        secondCheck: false,
        thirdCheck: false,
    }
})

export const isFirstStepCompleted = selector({
    key: 'isFirstStepCompleted',
    get: ({get}) => {
        const fields = get(signupFormState);
        const firstForms = ['country', 'companyCategory', 'bizNumber', 'companyName']
        for (let form of firstForms) {
            if (fields[form].error) {
                return false;
            }
        }
        return true;
    }
})

export const isSecondStepCompleted = selector({
    key: 'isSecondStepCompleted',
    get: ({get}) => {
        const fields = get(signupSecondFormState);
        return Object.values(fields).every((field) => field);
    }
})

export const isThirdStepCompleted = selector({
    key: 'isThirdStepCompleted',
    get: ({get}) => {
        const fields = get(signupFormState);
        for (let field in fields) {
            if (fields[field].error) {
                return false;
            }
        }
        return true;
    }
})

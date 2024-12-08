import { atom } from "recoil";

export const workplaceDetailAtom = atom({
  key: "workplaceDetail",
  default: {
    open: false,
    id: '',
    type: '',
    company_branch: '',
    company_name: '',
    company_use: '',
    company_number1: '',
    company_number2: '',
    company_number3: '',
    workplace_name: '',
    phone_number1: '',
    phone_number2: '',
    phone_number3: '',
    industry_type: '',
    company_size: '',
    employee_number: '',
    address1: '',
    address2: '',
    address3: '',
    sales_last: '',
    sales_now: '',
    area_j: '',
    area_y: '',
    register_date: null,
    close_date: null,
    product_yn: ''
  },
});

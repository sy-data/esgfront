

const testData = Array.from({ length: 50 }, (_, index) => {
  return {
    no: index + 4, // 순번
    id: index + 4, formulaId: '00002', formulaName: 'Scope1', description: ''
  };
})


export const regCalcFormulaDummy = {
  depth1: [
    {no: 1, id: 1, formulaId: '00002', formulaName: 'Scope1', description: ''},
    {no: 2, id: 2, formulaId: '00066', formulaName: 'Scope2', description: ''},
    {no: 3, id: 3, formulaId: '00072', formulaName: 'Scope3', description: ''},
    ...testData
  ],
  depth2: [
    {no: 1, id: 1, formulaId: '00002', formulaName: '고정연소', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
    {no: 2, id: 2, formulaId: '00066', formulaName: '기체연료연소', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
    {no: 3, id: 3, formulaId: '00072', formulaName: '액체연료연소', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
  ],
  depth3: [
    {no: 1, id: 1, formulaId: '00002', formulaName: '고상', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
    {no: 2, id: 2, formulaId: '00066', formulaName: '액상', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
    {no: 3, id: 3, formulaId: '00072', formulaName: '기상', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
  ],
  depth4: [
    {no: 1, id: 1, formulaId: '00002', formulaName: '생활폐기물', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
    {no: 2, id: 2, formulaId: '00066', formulaName: '사업장폐기물', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
    {no: 3, id: 3, formulaId: '00072', formulaName: '하수슬러지', isActive: true, formulaVersion: 1, updateDate: '2024-07-01'},
  ],
}



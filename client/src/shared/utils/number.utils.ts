// Half meals are possible, so show decimals only when needed
export const getDecimals = (value: number) => (Number.isInteger(value) ? 0 : 2);
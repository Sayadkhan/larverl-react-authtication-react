export const currencyFormatter = (amount) => {
  return amount?.toLocaleString("bn-BD", {
    style: "currency",
    currency: "BDT",
  });
};

const useFilteredData = (a: any, b: any, decider: string) => {
  const filteredData = a.filter((A: any) => {
    const finder = b.find((B: any) => {
      return A._id === B._id;
    });
    return decider === "equals" ? finder : !finder;
  });
  return { filteredData };
};

export default useFilteredData;

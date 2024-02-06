export const facilityToString = (id) => {
    if (id === 'c')
        return "Cơ sở chính";
    if (id === '1' || id === '2')
        return "Cơ sở " + id;
}

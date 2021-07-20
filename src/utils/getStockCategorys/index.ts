export function getStockCategorys(List: any){
    const finalList = []
    List.forEach(el => {
        if (!finalList.includes(el.GRUPO)) {
            finalList.push(el.GRUPO.trim())
        }
    })
}
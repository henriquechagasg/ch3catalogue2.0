
export default function lowerCaseSentence(sentence: string){
    const sentenceAsList = sentence.toLowerCase().split(" ");
    const repairedSentence = sentenceAsList.map(el => {
      if (el[0]) {
        return el[0].toUpperCase() + el.slice(1,)
      }
    })
    return repairedSentence.join(" ")
}
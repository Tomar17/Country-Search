let attr=localStorage.getItem('attr').split(',')


const searchBtn = document.querySelector('#searchBtn')

searchBtn.addEventListener('click',()=>{
    const country = document.querySelector('input').value
    
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((data)=>{
        if (!data.ok){
            throw new Error('not found')
        }else{
            return data.json()
        }
    })
    .then((data)=>{

        //put all object
        //when going through teh attr list, use each name as key for the object
        const info = data[0]
        const flagUrl=info.flags.png
        const name = info.name.common
        const capital = info.capital[0]
        const population = info.population

        const currency =Object.values(info.currencies)[0]
        const language =Object.values(info.languages)
        const continent =info.continents[0]

        resultsObj={
            countryFlag:flagUrl,
            countryName:name,
            countryCapital:capital,
            countryPopulation:population.toLocaleString('en-US', {minimumFractionDigits: 0}),
            countryCurrency:`${currency['name']} (${currency['symbol']})`,
            countryLanguage:language,
            countryContinent:continent

        }

        //FLAG AND NAME--------------------
        document.querySelector('#flagId').src=resultsObj.countryFlag
        document.querySelector('#nameId').innerHTML=`${resultsObj.countryName}`

        document.querySelector('.choicesDiv').innerHTML=''
        //OTHER ATTR ------------------
        // alert(attr.length)
        if (attr.length===1){
            null
        }else{
            // alert('ran')
            
            attr.forEach((element)=>{
                par = document.createElement('p')
                par.innerText=`${element.substring(7,)}: ${resultsObj[element]}`
                document.querySelector('.choicesDiv').appendChild(par)
            })
        }
        
    })
    .catch((err)=>{
        document.querySelector('#flagId').src=`./searchNotFound.png`
        document.querySelector('#nameId').innerHTML=``
        document.querySelector('.choicesDiv').innerHTML=''})

    .finally(()=>{console.log('done')})
    
    
    
})

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

window.onload = () => {
    const searchInput = document.querySelector('#search');
    const matchesList = document.querySelector('#suggestions');

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => cities.push(...data));
    
    function findMatches(wordToMatch, cities){
        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return wordToMatch !== '' ? place.city.match(regex) || place.state.match(regex) : null;
        });
    };

    function displayMatches(){

        const html = findMatches(this.value, cities).map(place => {
            const regex = new RegExp(this.value, 'gi');
            const formatedCityPart = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
            const formatedStatePart = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

            return `
                <li>
                    <span class="name">${formatedCityPart}, ${formatedStatePart}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>    
                </li>
            `;
        }).join('');
        matchesList.innerHTML = html
    }

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);

};
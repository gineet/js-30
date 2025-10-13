type City = {
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  population: string;
  rank: string;
  growth_from_2000_to_2013: string;
}

(async function initialize() {
  const searchInput = document.querySelector('input.search') as HTMLInputElement;
  const suggestions = document.querySelector('ul.suggestions') as HTMLUListElement;
  const cities = await fetchCities();

  async function fetchCities(): Promise<City[]> {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Unable to fetch cities: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as City[];
      if (!Array.isArray(data)) {
        throw new Error(`Invalid format of cities`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching Cities.', error);
      return [];
    }
  }

  function findMatches(wordToMatch: string, cities: City[]) {
    const searchTerm = wordToMatch.trim().toLowerCase();
    return cities.filter(({ city, state }) => {
      return city.toLowerCase().includes(searchTerm) || state.toLowerCase().includes(searchTerm);
    });
  }

  function numberWithCommas(x: string | number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const displayMatches = (event: Event) => {
    const searchTerm = (event.currentTarget as HTMLInputElement).value;
    const matches = findMatches(searchTerm, cities)
    const searchTermRegex = new RegExp(searchTerm, 'gi');
    const html = matches.map(({ city, state, population }) => {
      const cityName = city.replace(searchTermRegex, `<span class="hl">${searchTerm}</span>`)
      const stateName = state.replace(searchTermRegex, `<span class="hl">${searchTerm}</span>`)
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(population)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('keyup', displayMatches);
}());
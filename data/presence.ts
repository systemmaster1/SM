export const indiaPresence = [
  {name: 'Delhi', key: 'delhi', coordinates: [77.1025, 28.7041]},
  {name: 'Uttar Pradesh', key: 'uttarPradesh', coordinates: [80.9462, 26.8467]},
  {name: 'Madhya Pradesh', key: 'madhyaPradesh', coordinates: [78.6569, 22.9734]},
  {name: 'Gujarat', key: 'gujarat', coordinates: [71.1924, 22.2587]},
  {name: 'Maharashtra', key: 'maharashtra', coordinates: [75.7139, 19.7515]},
  {name: 'Rajasthan', key: 'rajasthan', coordinates: [74.2179, 27.0238]},
  {name: 'Karnataka', key: 'karnataka', coordinates: [75.7139, 15.3173]}
] as const;

export const worldwidePresence = [
  {name: 'India', key: 'india', code: 'IN', coordinates: [78.9629, 20.5937]},
  {name: 'USA', key: 'usa', code: 'US', coordinates: [-98.5795, 39.8283]},
  {name: 'Italy', key: 'italy', code: 'IT', coordinates: [12.5674, 41.8719]},
  {name: 'Bangladesh', key: 'bangladesh', code: 'BD', coordinates: [90.3563, 23.685]},
  {name: 'Russia', key: 'russia', code: 'RU', coordinates: [105.3188, 61.524]},
  {name: 'Indonesia', key: 'indonesia', code: 'ID', coordinates: [113.9213, -0.7893]}
] as const;

export const presenceStats = [
  {value: '7', key: 'states'},
  {value: '6', key: 'countries'},
  {value: '10+', key: 'years'},
  {value: 'R&D', key: 'innovation'}
] as const;

const API_KEY = 'YOUR Polygon API key'; //<--------------------Paste Your Polygon API key HERE
const S3_ENDPOINT = 'https://api.polygon.io';

document.getElementById('stockForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const symbol = document.getElementById('symbol').value.toUpperCase();
    const indicator = document.getElementById('indicator').value;

    fetchStockData(symbol, indicator);
});

async function fetchStockData(symbol, indicator) {
    try {
        const url = `${S3_ENDPOINT}/v2/aggs/ticker/${symbol}/prev?apiKey=${API_KEY}`;

        
        const response = await fetch(url);
        const data = await response.json();

        
        if (data.error) {
            alert('Error fetching stock data');
            return;
        }

        
        renderChart(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('Failed to fetch stock data');
    }
}


function renderChart(data) {
    
    const dates = data.results.map(item => new Date(item.t).toLocaleDateString());
    const prices = data.results.map(item => item.c); 

    const trace = {
        x: dates, 
        y: prices,
        type: 'line',
        name: 'Stock Data'
    };

    const layout = {
        title: 'Stock Price Over Time',
        xaxis: {
            title: 'Date',
            showgrid: false
        },
        yaxis: {
            title: 'Price (USD)',
            showgrid: true
        },
        autosize: true
    };

    Plotly.newPlot('chart', [trace], layout); 
}

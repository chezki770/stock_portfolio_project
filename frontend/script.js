const API_URL = 'http://localhost:3000';

async function login() {
    const investorName = document.getElementById('investorName').value;
    if (investorName) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ investorName })
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('mainSection').style.display = 'block';
                document.getElementById('welcomeName').textContent = investorName;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    } else {
        alert('Please enter your name');
    }
}

async function buyStocks() {
    const symbol = prompt('Enter stock symbol:');
    const shares = prompt('Enter number of shares:');
    if (symbol && shares) {
        try {
            const response = await fetch(`${API_URL}/buy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    investorName: document.getElementById('welcomeName').textContent,
                    stockSymbol: symbol,
                    shares: parseInt(shares)
                })
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById('results').textContent = data.message;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            alert(`Failed to buy stocks: ${error.message}`);
        }
    }
}

async function sellStocks() {
    const symbol = prompt('Enter stock symbol:');
    const shares = prompt('Enter number of shares:');
    if (symbol && shares) {
        try {
            const response = await fetch(`${API_URL}/sell`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    investorName: document.getElementById('welcomeName').textContent,
                    stockSymbol: symbol,
                    shares: parseInt(shares)
                })
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById('results').textContent = data.message;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            alert(`Failed to sell stocks: ${error.message}`);
        }
    }
}

async function showPortfolio() {
    try {
        const investorName = document.getElementById('welcomeName').textContent;
        const response = await fetch(`${API_URL}/portfolio/${investorName}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('results').textContent = JSON.stringify(data, null, 2);
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        alert(`Failed to fetch portfolio: ${error.message}`);
    }
}

async function updateStockPrices() {
    try {
        const response = await fetch(`${API_URL}/update-prices`, { method: 'POST' });
        const data = await response.json();
        if (response.ok) {
            document.getElementById('results').textContent = data.message;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        alert(`Failed to update stock prices: ${error.message}`);
    }
}

async function evaluateStockRisk() {
    const symbol = prompt('Enter stock symbol:');
    if (symbol) {
        try {
            const response = await fetch(`${API_URL}/evaluate-stock/${symbol}`);
            const data = await response.json();
            if (response.ok) {
                document.getElementById('results').textContent = data.riskAssessment;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            alert(`Failed to evaluate stock risk: ${error.message}`);
        }
    }
}

async function evaluatePortfolioRisk() {
    try {
        const investorName = document.getElementById('welcomeName').textContent;
        const response = await fetch(`${API_URL}/evaluate-portfolio/${investorName}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('results').textContent = data.riskAssessment;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        alert(`Failed to evaluate portfolio risk: ${error.message}`);
    }
}

async function showComprehensiveRiskReport() {
    try {
        const investorName = document.getElementById('welcomeName').textContent;
        const response = await fetch(`${API_URL}/comprehensive-report/${investorName}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('results').textContent = data.report;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        alert(`Failed to generate comprehensive risk report: ${error.message}`);
    }
}
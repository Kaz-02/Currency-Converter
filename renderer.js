document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = await window.api.getApiKey(); // Electron から APIキーを取得
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convertButton");
    const result = document.getElementById("result");

    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrency.appendChild(optionTo);
    });

    convertButton.addEventListener("click", () => {
        const amount = document.getElementById("amount").value;
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const convertedAmount = (amount * data.conversion_rates[toValue] / data.conversion_rates[fromValue]).toFixed(2);

        result.textContent = `${convertedAmount} ${toValue}`;
    });
});

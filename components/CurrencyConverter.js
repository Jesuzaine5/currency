import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
                );
                const rate = response.data.rates[toCurrency];
                setExchangeRate(rate);
                setConvertedAmount(amount * rate);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
                // Handle error, e.g., display an error message
            } finally {
                setIsLoading(false);
            }
        };

        if (fromCurrency && toCurrency) {
            fetchExchangeRate();
        }
    }, [amount, fromCurrency, toCurrency]);

    const handleAmountChange = (event) => {
        setAmount(parseFloat(event.target.value));
    };

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>
            <div>
                <label htmlFor="fromCurrency">From:</label>
                <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                >
                    <option value="USD">USD</option>
                    {/* Add more currency options here */}
                </select>
            </div>
            <div>
                <label htmlFor="toCurrency">To:</label>
                <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                >
                    <option value="EUR">EUR</option>
                    {/* Add more currency options here */}
                </select>
            </div>
            {isLoading? (
                <p>Loading...</p>
            ): (
                <div>
                    <p>
                        {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{' '}
                        {toCurrency}
                    </p>
                    <p>Exchange Rate: {exchangeRate.toFixed(4)}</p>
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;
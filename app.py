from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # To allow cross-origin requests from the frontend

@app.route('/stock/<string:ticker>', methods=['GET'])
def get_stock(ticker):
    stock = yf.Ticker(ticker)
    historical_data = stock.history(period='1mo')  # Get the past month of data
    info = stock.info  # Get the stock info
    return jsonify({
        'ticker': ticker,
        'history': historical_data.to_dict(),  # Convert DataFrame to dict
        'info': info
    })

if __name__ == '__main__':
    app.run(debug=True)
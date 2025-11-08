const normalizedZerodhaTradeData = (data: any) => {
    const normalizedData = data.map((trade: any) => {
        return {
            "exchange": trade.exchange,
            "symbol": trade.tradingsymbol,
            "order_id": trade.order_id,
            "trade_id": trade.trade_id,
            "price": trade.average_price,
            "quantity": trade.quantity,
            "instrumentToken": trade.instrument_token,
            "exchange_order_id": trade.exchange_order_id,
            "transactionType": trade.transaction_type,
            "tradeDateTime": trade.fill_timestamp
        }
    })
    return normalizedData
}

export default normalizedZerodhaTradeData
type Trade = {
    trade_id: string,
    order_id: string,
    exchange: string,
    tradingSymbol: string,
    product: string,
    price: number,
    quantity: number,
    instrumentToken: number,
    exchange_order_id: string,
    transactionType: string,
    tradeDateTime: string
}

type User = {
    id: string,
    name: string,
    email: string,
    password: string,
}

type Broker = {
    id: string,
    user_id: string,
    broker_type: string,
    broker_accessToken: string,
    broker_refreshToken?: string
}

export { Trade, User, Broker }
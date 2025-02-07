const SubscriptionCardComponent = ({type, price, features, buttonText,handleSubmit, subscriptionStatus}) => {
    return (
        <div className='card' id={type.toLowerCase()}>
                <h1 className='card-title'>{type} Plan</h1>
                <div className='card-price-container'>
                    <h2 className='card-price'>${price}</h2>
                    <div className='per-month-container'>
                        <h3 className='per-month-text'>per month</h3>
                        <p className='per-month-text-small'>Billed monthly</p>
                    </div>
                </div>
                <div className='features-container'>
                    <ul className='subscription-features'>
                        {features.map((feature, index) => (
                            <li className='subscription-feature' key={index}><span className='feature-title'>{feature.title}:</span> {feature.description}</li>
                        ))}
                    </ul>
                </div>
                <button className='subscribe-button' type='submit' onClick={e => handleSubmit(e, type.toLowerCase())}>{buttonText}</button>
            </div>
    )
}

export default SubscriptionCardComponent;

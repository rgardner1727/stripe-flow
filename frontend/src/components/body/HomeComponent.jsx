import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useEffect } from 'react';
import '../../styles/home.css';
import exampleImage from '../../assets/example.webp';
import reactIcon from '../../assets/react.svg';

const HomeComponent = () => {
    const { subscriptionStatus, subscriptionType } = useSubscription();

    const carouselItems = [
        <div className='carousel-item'>
            <div className='carousel-top-container'>
                <img src={reactIcon} alt='Icon Example' className='carousel-item-icon'/>
                <button className='carousel-item-button' onClick={() => console.log('Clicked')}>View</button>
            </div>
            <div className='carousel-bottom-container'>
                <h1 className='carousel-current-amount'>0</h1>
                <h3 className='carousel-goal'>/8 hours of sleep</h3>
            </div>
        </div>,
        <div className='carousel-item'>
            <div className='carousel-top-container'>
                <img src={reactIcon} alt='Icon Example' className='carousel-item-icon'/>
                <button className='carousel-item-button' onClick={() => console.log('Clicked')}>View</button>
            </div>
            <div className='carousel-bottom-container'> 
                <h1 className='carousel-current-amount'>0</h1>
                <h3 className='carousel-goal'>/3,000 calories burned</h3>
            </div>
        </div>,
        <div className='carousel-item'>
            <div className='carousel-top-container'>
                <img src={reactIcon} alt='Icon Example' className='carousel-item-icon'/>
                <button className='carousel-item-button' onClick={() => console.log('Clicked')}>View</button>
            </div>
            <div className='carousel-bottom-container'>
                <h1 className='carousel-current-amount'>0</h1>
                <h3 className='carousel-goal'>/60 mins activities</h3>
            </div>
        </div>,
        <div className='carousel-item'>
            <div className='carousel-top-container'>
                <img src={reactIcon} alt='Icon Example' className='carousel-item-icon'/>
                <button className='carousel-item-button' onClick={() => console.log('Clicked')}>View</button>
            </div>
            <div className='carousel-bottom-container'>
                <h1 className='carousel-current-amount'>0</h1>
                <h3 className='carousel-goal'>/10,000 steps</h3>
            </div>
        </div>,
        <div className='carousel-item'>
            <div className='carousel-top-container'>
                <img src={reactIcon} alt='Icon Example' className='carousel-item-icon'/>
                <button className='carousel-item-button' onClick={() => console.log('Clicked')}>View</button>
            </div>
            <div className='carousel-bottom-container'> 
                <h1 className='carousel-current-amount'>0</h1>
                <h3 className='carousel-goal'>/6 glasses of water</h3>
            </div>
        </div>,
        <div className='carousel-item'>
            <div className='carousel-top-container'>
                <img src={reactIcon} alt='Icon Example' className='carousel-item-icon'/>
                <button className='carousel-item-button' onClick={() => console.log('Clicked')}>View</button>
            </div>
            <div className='carousel-bottom-container'>
                <h1 className='carousel-current-amount'>0</h1>
                <h3 className='carousel-goal'>/10 mins meditation</h3>
            </div>
        </div>
    ]

    const scrollLeft = () => {
        const carousel = document.getElementById('carousel');
        carousel.scrollLeft -= 210;
    }

    const scrollRight = () => {
        const carousel = document.getElementById('carousel');
        carousel.scrollLeft += 210;
    }

    return (
        <>
            {subscriptionStatus && 
                <div className='home-container'>
                    <section className='section-one'>
                        <div className='section-one-text-container'>
                            <h1 className='section-one-h1'>Daily Wellness</h1>
                            <h2 className='section-one-h2'>Release Anxiety and Stress</h2>
                            <p className='section-one-p'>Everyone - Mindfullness - Meditation</p>
                        </div>
                        <img src={exampleImage} alt='Example Image' className='section-one-image'/>
                    </section>
                    <section className='section-two'>
                        <div className='section-two-top-container'>
                            <h1 className='section-two-h1'>Today's Progress</h1>
                            <button className='section-two-button'>View All</button>
                        </div>
                        <div className='section-two-carousel'>
                            <div className='scrollable-container' id='carousel'>
                                <div className='carousel-items-container'>
                                    {carouselItems}
                                </div>
                            </div>
                            <div className='carousel-button-container'>
                                <button className='carousel-button' onClick={() => scrollLeft()}>Prev</button>
                                <button className='carousel-button' onClick={() => scrollRight()}>Next</button>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </>
    )

}

export default HomeComponent;
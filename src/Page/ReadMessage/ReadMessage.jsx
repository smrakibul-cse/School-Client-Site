import NavBar from '../../Navber/NavBar';
import head from '../../assets/head.jpg';
import './message.css';

const ReadMessage = () => {
    return (
        <div>
            <NavBar />
            <div className="read-message-container">
                <div className='message-content'>
                    <div className='message-header'>
                        <div className='message-header-image-container'>
                            <img className='message-header-image' src={head} alt="Headmaster" />
                        </div>
                        <div className='message-header-title'>
                            <h1 className='message-header-title-text inter'>HEADMASTER's MESSAGE:</h1>
                        </div>
                    </div>
                    <div className='message-body'>
                        <div className='message-text'>
                            <h2 className='message-heading inter'>Dear inhabitants of Rowmari,</h2>
                            <p className='message-paragraph inter'>
                                Assalamualaikum. Amidst a world propelled by cutting-edge science and information technology, and with a national commitment to forging a digital Bangladesh, students from the modest locale of Rowmari CG Zaman Government High School are actively contributing to this transformative journey. Empowered by quality education and equipped with digital literacy, they are embracing innovation and playing their part in the nation's digital evolution. Through their endeavors, they not only enrich their own educational experiences but also contribute to the collective progress of their community and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadMessage;

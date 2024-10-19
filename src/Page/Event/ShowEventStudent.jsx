import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/UseAxiosPublic";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender2.css';
import NavBar from "../../Navber/NavBar";

const ShowEventStudent = () => {
    const axiosPublic = useAxiosPublic();
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosPublic.get('/getEvent');
                setEvents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosPublic]);

    const handleDateClick = (date) => {
        const clickedDate = date.toISOString().split('T')[0];
        const filteredEvents = events.filter(event => event.date === clickedDate);
        setSelectedDateEvents(filteredEvents);
        if (filteredEvents.length > 0) {
            setSelectedEvent(filteredEvents[0]);
        } else {
            setSelectedEvent(null);
        }
    };

    const eventDates = events.map(event => new Date(event.date));

    const tileContent = ({ date, view }) => {
        if (view === 'month' && eventDates.find(eventDate => eventDate.toISOString().split('T')[0] === date.toISOString().split('T')[0])) {
            return <div className="event-indicator">•</div>;
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const calculateTimeRemaining = (eventDate, eventTime) => {
        const eventDateTime = new Date(`${eventDate}T${eventTime}`);
        const now = new Date();
        const timeDifference = eventDateTime - now;

        if (timeDifference <= 0) {
            return 'Event date has expired';
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}m remaining`;
    };

    return (
        <div className="show-event-student">
            <NavBar />
            <div className="container">
                <div className="calendar-container ">
                    <Calendar
                        onClickDay={handleDateClick}
                        tileContent={tileContent}
                    />
                </div>
                <div className="event-details">
                    {selectedEvent ? (
                        <div className="event-card">
                            <h3>{selectedEvent.head}</h3>
                            <p>{selectedEvent.details}</p>
                            <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
                            <p><strong>Time:</strong> {formatTime(selectedEvent.time)}</p>
                            <p className="time-remaining">{calculateTimeRemaining(selectedEvent.date, selectedEvent.time)}</p>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-bold">All Events</h3>
                            {events.map(event => (
                                <div key={event._id} className="event-card">
                                    <h3>{event.head}</h3>
                                    <p>{event.details}</p>
                                    <p><strong>Date:</strong> {formatDate(event.date)}</p>
                                    <p><strong>Time:</strong> {formatTime(event.time)}</p>
                                    <p className="time-remaining">{calculateTimeRemaining(event.date, event.time)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowEventStudent;

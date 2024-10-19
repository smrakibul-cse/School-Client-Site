import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useAxiosSecure from "../Hook/AxiosSecure";
import './calender.css';
import { Link, NavLink } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const ShowEventAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [events, setEvents] = useState([]);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axiosSecure.get('/getEvent');
                setEvents(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEvent();
    }, [axiosSecure]);

    const handleEventDelete = (eventId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/event/${eventId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setEvents(events.filter(event => event._id !== eventId));
                            Swal.fire({
                                title: "Deleted!",
                                text: "The event has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting event:", error);
                    });
            }
        });
    };

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
            return <div className="text-red-500 font-bold">•</div>;
        }
    };

    const calculateTimeRemaining = (eventDate) => {
        const now = new Date();
        const eventDateTime = new Date(eventDate);
        const timeDifference = eventDateTime - now;

        if (timeDifference <= 0) {
            return "Event has expired";
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

        return `${days}d ${hours}h ${minutes}m remaining`;
    };

    return (
        <div>
            <div className="flex gap-7 mx-20 my-8">
                <div className="shadow-lg rounded-lg p-4 bg-white">
                    <Calendar
                        onClickDay={handleDateClick}
                        tileContent={tileContent}
                    />
                </div>
                <div className="flex-1 bg-white shadow-lg rounded-lg p-4">
                    {selectedEvent ? (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Event Details</h3>
                            <p className="mb-2 text-lg">{calculateTimeRemaining(selectedEvent.date + 'T' + selectedEvent.time)}</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="border p-2 text-center">Head</th>
                                        <th className="border p-2">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-2 text-center">{selectedEvent.head}</td>
                                        <td className="border p-2 text-center">{selectedEvent.details}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">All Events</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th className="border p-2 text-center">Head</th>
                                        <th className="border p-2 text-center">Details</th>
                                        <th className="border p-2 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(event => (
                                        <tr key={event._id}>
                                            <td className="border p-2 text-center">{event.head}</td>
                                            <td className="border p-2 text-center">{event.details}</td>
                                            <td className="border p-2 text-center">
                                                <div className="flex item-center gap-1">
                                                    <NavLink to={`edit/${event._id}`}>
                                                        <button className="text-xl text-blue-500">
                                                            <FaEdit />
                                                        </button>
                                                    </NavLink>
                                                    <button className="text-xl text-red-500 -mt-1" onClick={() => handleEventDelete(event._id)}>
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                                <p className="mt-1 text-sm">{calculateTimeRemaining(event.date + 'T' + event.time)}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
            <Link to={'/dashboard/addEvent'}>
                <button className="text-red-400 link-hover flex justify-center mx-auto py-6">Go Back To Add Event</button>
            </Link>
        </div>
    );
};

export default ShowEventAdmin;

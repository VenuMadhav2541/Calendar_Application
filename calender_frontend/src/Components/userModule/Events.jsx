import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div>
            <h1>Calendar Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        {event.title} - {event.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;

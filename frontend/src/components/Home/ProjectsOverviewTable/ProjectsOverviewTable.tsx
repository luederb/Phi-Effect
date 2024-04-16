import "./ProjectsOverviewTable.css";
import {useEffect, useState} from "react";
import {Event} from "../../../Types/Event.ts";

export default function ProjectsOverviewTable() {
    const [events, setEvents] = useState<Event[]>([]);

    function fetchEvents() {
        setEvents(
            [
                {
                    id: 4,
                    name: "Beautiful Canada",
                    date: "01.10.2024",
                    location: "Toronto"
                },
                {
                    id: 5,
                    name: "Brad's Film Award",
                    date: "23.07.2024",
                    location: "Hollywood"
                },
                {
                    id: 6,
                    name: "Exploring Mannheim",
                    date: "29.03.2024",
                    location: "Toronto"
                }
            ]
        )
    }

    useEffect(() => {
        fetchEvents();
    }, []);
    return (
        <div className="projects-overview-table">
            {events.length === 0 ?
                <p>You have no upcoming events</p>
                :
                <table>
                    <caption>Your upcoming events are:</caption>
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <th scope="row">{event.name}</th>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>}
        </div>
    )
}
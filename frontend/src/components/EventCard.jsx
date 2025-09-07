import React from 'react'
import { Link } from 'react-router-dom'


export default function EventCard({ event }){
return (
<article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-4 flex gap-4">
<div className="w-28 h-20 bg-gray-100 rounded-md flex-shrink-0">
{event.image ? <img src={event.image} alt={event.title} className="w-full h-full object-cover" /> : null}
</div>
<div className="flex-1">
<h3 className="text-lg font-semibold">{event.title}</h3>
<p className="text-sm text-slate-500">{event.type} • {new Date(event.date).toLocaleDateString()}</p>
<p className="mt-2 text-sm text-slate-600 line-clamp-2">{event.desc}</p>
<div className="mt-3">
<Link to={`/events/${event._id}`} className="text-sm text-indigo-600">View Details →</Link>
</div>
</div>
</article>
)
}
import Event from "../models/Event.js";

// @desc Get all events
export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
};

// @desc Get single event
export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};

// @desc Create event
export const createEvent = async (req, res) => {
  const { title, type, date, desc, image, link } = req.body;
  const event = await Event.create({ title, type, date, desc, image, link });
  res.status(201).json(event);
};

// @desc Update event
export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  Object.assign(event, req.body);
  const updatedEvent = await event.save();
  res.json(updatedEvent);
};

// @desc Delete event
export const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ message: "Event removed" });
};

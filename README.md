# Event Planner App

A React-based Event Planner application for managing guest lists with RSVP functionality. This app allows users to add, edit, and remove guests, as well as track their RSVP status.

## Features

- Add new guests with name and email information
- View and manage a list of all invited guests
- Update guest information
- Remove guests from the list
- Track and toggle RSVP status (confirmed/unconfirmed)
- View attendance statistics in real-time

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
cd vite-project
npm install
```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

### Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

- `src/components/` - React components
  - `GuestForm.jsx` - Form for adding new guests
  - `GuestList.jsx` - List of all guests
  - `Guest.jsx` - Individual guest component
  - `RsvpSummary.jsx` - Component displaying attendance statistics

## Technology Stack

- React 19
- Vite 6
- CSS3

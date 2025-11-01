// src/components/admin/TimeSlotManagement.jsx

import React, { useState } from 'react';
import { useData } from '../../context/DataContext.jsx';

const TimeSlotManagement = () => {
  const { timeSlots, saveTimeSlots } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    isLunch: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate time format and logic
    if (formData.startTime >= formData.endTime) {
      alert('End time must be after start time');
      return;
    }

    const slotData = {
      id: editingSlot ? editingSlot.id : Date.now().toString(),
      ...formData
    };

    let updatedSlots;
    if (editingSlot) {
      updatedSlots = timeSlots.map(s => 
        s.id === editingSlot.id ? slotData : s
      );
    } else {
      updatedSlots = [...timeSlots, slotData];
    }

    // Sort by start time
    updatedSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));

    saveTimeSlots(updatedSlots);
    resetForm();
  };

  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setFormData({
      startTime: slot.startTime,
      endTime: slot.endTime,
      isLunch: slot.isLunch
    });
    setShowForm(true);
  };

  const handleDelete = (slotId) => {
    if (confirm('Are you sure you want to delete this time slot?')) {
      const updatedSlots = timeSlots.filter(s => s.id !== slotId);
      saveTimeSlots(updatedSlots);
    }
  };

  const resetForm = () => {
    setFormData({
      startTime: '',
      endTime: '',
      isLunch: false
    });
    setEditingSlot(null);
    setShowForm(false);
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // UPDATED: Generate time options with 10-minute intervals to support 50-minute lectures
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 10) { // Changed from 30 to 10
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeStr);
      }
    }
    return options;
  };

  // ADDED: Quick preset buttons for common 50-minute lecture patterns
  const addPresetSlots = () => {
    const presetSlots = [
      { startTime: '09:00', endTime: '09:50', isLunch: false },
      { startTime: '10:00', endTime: '10:50', isLunch: false },
      { startTime: '11:00', endTime: '11:50', isLunch: false },
      { startTime: '12:00', endTime: '12:50', isLunch: false },
      { startTime: '12:50', endTime: '13:40', isLunch: true },  // Lunch
      { startTime: '13:40', endTime: '14:30', isLunch: false },
      { startTime: '14:40', endTime: '15:30', isLunch: false },
      { startTime: '15:40', endTime: '16:30', isLunch: false }
    ];

    const newSlots = presetSlots.map((slot, index) => ({
      id: `preset_${Date.now()}_${index}`,
      ...slot
    }));

    const updatedSlots = [...timeSlots, ...newSlots];
    updatedSlots.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    saveTimeSlots(updatedSlots);
    alert('50-minute lecture slots added successfully!');
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="timeslot-management">
      <div className="table-header">
        <h2>Time Slot Management</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setShowForm(true)}>Add Time Slot</button>
          <button 
            onClick={addPresetSlots}
            style={{ background: '#28a745', color: 'white' }}
          >
            Add 50-min Lecture Slots
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editingSlot ? 'Edit Time Slot' : 'Add New Time Slot'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Start Time:</label>
                {/* UPDATED: Use HTML time input for more flexibility */}
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({...prev, startTime: e.target.value}))}
                  min="08:00"
                  max="18:00"
                  step="300" // 5-minute steps
                  required
                />
                {/* Fallback dropdown for browsers that don't support time input well */}
                <select
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({...prev, startTime: e.target.value}))}
                  style={{ marginTop: '0.5rem' }}
                >
                  <option value="">Or select from dropdown</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>End Time:</label>
                {/* UPDATED: Use HTML time input for more flexibility */}
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({...prev, endTime: e.target.value}))}
                  min="08:00"
                  max="18:00"
                  step="300" // 5-minute steps
                  required
                />
                {/* Fallback dropdown */}
                <select
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({...prev, endTime: e.target.value}))}
                  style={{ marginTop: '0.5rem' }}
                >
                  <option value="">Or select from dropdown</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <input
                    type="checkbox"
                    checked={formData.isLunch}
                    onChange={(e) => setFormData(prev => ({...prev, isLunch: e.target.checked}))}
                  />
                  Lunch Break
                </label>
              </div>
            </div>

            {/* ADDED: Quick duration buttons */}
            <div className="form-group">
              <label>Quick Duration:</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.startTime) {
                      const [hours, minutes] = formData.startTime.split(':');
                      const startDate = new Date(`2000-01-01T${formData.startTime}`);
                      const endDate = new Date(startDate.getTime() + 50 * 60000); // Add 50 minutes
                      const endTime = endDate.toTimeString().slice(0, 5);
                      setFormData(prev => ({...prev, endTime}));
                    }
                  }}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                >
                  +50 min
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.startTime) {
                      const [hours, minutes] = formData.startTime.split(':');
                      const startDate = new Date(`2000-01-01T${formData.startTime}`);
                      const endDate = new Date(startDate.getTime() + 60 * 60000); // Add 60 minutes
                      const endTime = endDate.toTimeString().slice(0, 5);
                      setFormData(prev => ({...prev, endTime}));
                    }
                  }}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                >
                  +60 min
                </button>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="submit">
                {editingSlot ? 'Update' : 'Add'} Time Slot
              </button>
              <button type="button" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => {
              const duration = new Date(`2000-01-01T${slot.endTime}`) - new Date(`2000-01-01T${slot.startTime}`);
              const durationMinutes = duration / (1000 * 60);
              
              return (
                <tr key={slot.id} className={slot.isLunch ? 'lunch-row' : ''}>
                  <td>{formatTime(slot.startTime)}</td>
                  <td>{formatTime(slot.endTime)}</td>
                  <td>
                    <span style={{ 
                      color: durationMinutes === 50 ? '#28a745' : 'inherit',
                      fontWeight: durationMinutes === 50 ? 'bold' : 'normal'
                    }}>
                      {durationMinutes} minutes
                    </span>
                  </td>
                  <td>
                    {slot.isLunch ? (
                      <span className="type-badge lunch">Lunch Break</span>
                    ) : (
                      <span className="type-badge lecture">Lecture</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn-small btn-edit"
                      onClick={() => handleEdit(slot)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-small btn-delete"
                      onClick={() => handleDelete(slot.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px'}}>
        <h4>Schedule Overview</h4>
        <p>Total Slots: {timeSlots.length}</p>
        <p>Lecture Slots: {timeSlots.filter(s => !s.isLunch).length}</p>
        <p>Lunch Breaks: {timeSlots.filter(s => s.isLunch).length}</p>
        <p>50-minute Slots: {timeSlots.filter(s => {
          const duration = new Date(`2000-01-01T${s.endTime}`) - new Date(`2000-01-01T${s.startTime}`);
          return (duration / (1000 * 60)) === 50;
        }).length}</p>
      </div>
    </div>
  );
};

export default TimeSlotManagement;

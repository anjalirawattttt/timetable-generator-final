// src/components/faculty/GenerateMonitoringTimetable.jsx

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useData } from "../../context/DataContext.jsx";
import { useTimetable } from "../../context/TimetableContext.jsx";
import TimetableGrid from "../timetable/TimetableGrid.jsx";

const GenerateMonitoringTimetable = () => {
  const { user } = useAuth();
  const { divisions, subjects, faculties, classrooms, timeSlots } = useData();
  const {
    timetables,
    generating,
    setGenerating,
    saveTimetable,
    getTimetableByDivision,
  } = useTimetable();
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [error, setError] = useState("");

  // Get faculty's monitoring division
  const monitoringDivision = divisions.find(
    (d) => d.id === user.monitoringDivision
  );
  const existingTimetable = getTimetableByDivision(user.monitoringDivision);

  // Timetable generation function
  const generateTimetable = async () => {
    console.log("Button clicked - starting generation");

    if (!monitoringDivision) {
      setError("No monitoring division assigned");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      console.log("Generation started for division:", monitoringDivision.name);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const divisionSubjects = subjects.filter((s) =>
        monitoringDivision.subjects?.includes(s.id)
      );

      const availableClassrooms = classrooms.filter(
        (c) => c.capacity >= monitoringDivision.studentCount
      );

      const lectureSlots = timeSlots.filter((slot) => !slot.isLunch);

      console.log("Division subjects:", divisionSubjects.length);
      console.log("Available classrooms:", availableClassrooms.length);
      console.log("Lecture slots:", lectureSlots.length);

      if (divisionSubjects.length === 0) {
        throw new Error("No subjects assigned to this division");
      }

      if (availableClassrooms.length === 0) {
        throw new Error("No suitable classrooms available");
      }

      if (lectureSlots.length === 0) {
        throw new Error("No lecture time slots available");
      }

      // Generate entries for ALL days
      const entries = [];
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
      let subjectIndex = 0;

      // FIXED: Ensure we generate for all days
      days.forEach((day, dayIndex) => {
        console.log(`Generating for ${day}`);

        lectureSlots.forEach((slot, slotIndex) => {
          const subject =
            divisionSubjects[subjectIndex % divisionSubjects.length];

          // Find faculty who teaches this subject
          const subjectFaculty = faculties.find((f) =>
            f.subjects?.includes(subject.id)
          );

          // Find appropriate classroom
          const appropriateClassroom = availableClassrooms.find((c) => {
            const typeMatch =
              subject.type === "Lab" ? c.type === "Lab" : c.type === "Theory";
            return typeMatch && c.capacity >= monitoringDivision.studentCount;
          });

          const finalClassroom =
            appropriateClassroom ||
            availableClassrooms.find(
              (c) => c.capacity >= monitoringDivision.studentCount
            ) ||
            availableClassrooms[0];

          const finalFaculty = subjectFaculty || faculties[0];

          console.log(
            `Creating entry for ${day}, slot ${slot.id}, subject ${subject.name}`
          );

          entries.push({
            id: `entry_${dayIndex}_${slotIndex}_${Date.now()}`,
            divisionId: monitoringDivision.id,
            day: day,
            timeSlotId: slot.id,
            subjectId: subject.id,
            facultyId: finalFaculty.id,
            classroomId: finalClassroom.id,
            isLunch: false,
          });

          subjectIndex++;
        });
      });

      console.log(
        `Generated ${entries.length} entries for ${days.length} days`
      );
      console.log(
        "Entries by day:",
        entries.reduce((acc, entry) => {
          acc[entry.day] = (acc[entry.day] || 0) + 1;
          return acc;
        }, {})
      );

      const newTimetable = {
        id: `tt_${Date.now()}`,
        divisionId: monitoringDivision.id,
        generatedBy: user.id,
        generatedAt: new Date().toISOString(),
        entries: entries,
        conflicts: [],
      };

      console.log(
        "Final timetable with",
        newTimetable.entries.length,
        "entries"
      );
      setGeneratedTimetable(newTimetable);
    } catch (err) {
      console.error("Generation error:", err);
      setError(`Generation failed: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const saveFinalTimetable = () => {
    if (generatedTimetable) {
      saveTimetable(generatedTimetable);
      setGeneratedTimetable(null);
      alert("Timetable saved successfully!");
    }
  };

  const discardTimetable = () => {
    setGeneratedTimetable(null);
  };

  // If no monitoring division assigned
  if (!monitoringDivision) {
    return (
      <div className="generate-timetable">
        <h2>Generate Timetable</h2>
        <div className="no-monitoring">
          <p>You are not assigned as a monitor for any division.</p>
          <p>
            Please contact the administrator to assign you a monitoring
            division.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="generate-timetable">
      {/* Page Header */}
      <div className="page-header">
        <h2>Generate Timetable - {monitoringDivision.name}</h2>
        <p>
          Division: {monitoringDivision.name} | Students:{" "}
          {monitoringDivision.studentCount} | Subjects:{" "}
          {monitoringDivision.subjects?.length || 0}
        </p>
      </div>

      {/* Division Information Card */}
      <div className="division-info-card">
        <h3>Division Information</h3>
        <div className="info-grid">
          <div>
            <strong>Division:</strong> {monitoringDivision.name}
          </div>
          <div>
            <strong>Students:</strong> {monitoringDivision.studentCount}
          </div>
          <div>
            <strong>Subjects:</strong>{" "}
            {monitoringDivision.subjects?.length || 0}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            {existingTimetable ? "Timetable exists" : "No timetable"}
          </div>
        </div>
      </div>

      {/* Generation Controls */}
      <div className="generation-controls">
        {existingTimetable && (
          <div className="existing-timetable-warning">
            <p>
              ⚠️ A timetable already exists for this division. Generating a new
              one will replace it.
            </p>
          </div>
        )}

        <div className="control-buttons">
          <button
            onClick={generateTimetable}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? "Generating..." : "Generate New Timetable"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}
      </div>

      {/* Generated Timetable Preview */}
      {generatedTimetable && (
        <div className="timetable-preview">
          <div className="preview-header">
            <h3>Generated Timetable Preview</h3>
            <div className="preview-actions">
              <button onClick={saveFinalTimetable} className="btn-success">
                Save Timetable
              </button>
              <button onClick={discardTimetable} className="btn-secondary">
                Discard
              </button>
            </div>
          </div>

          <TimetableGrid
            timetable={generatedTimetable}
            subjects={subjects}
            faculties={faculties}
            classrooms={classrooms}
            timeSlots={timeSlots}
            title={`${monitoringDivision.name} - Generated Timetable`}
          />
        </div>
      )}

      {/* Existing Timetable Display */}
      {existingTimetable && !generatedTimetable && (
        <div className="existing-timetable">
          <h3>Current Timetable</h3>
          <TimetableGrid
            timetable={existingTimetable}
            subjects={subjects}
            faculties={faculties}
            classrooms={classrooms}
            timeSlots={timeSlots}
            title={`${monitoringDivision.name} - Current Timetable`}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateMonitoringTimetable;

import { useState } from "react";

export default function Alarm({ alarms, setAlarms, audioRef }) {
  const [alarmTime, setAlarmTime] = useState("");
  const [repeat, setRepeat] = useState(false);

  function addAlarm() {
    if (!alarmTime) return;

    setAlarms((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        time: alarmTime,
        repeat,
      },
    ]);
    setAlarmTime("");
  }

  function removeAlarm(id) {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  }

  function handleRingtoneUpload(event) {
    const file = event.target.files?.[0];
    if (file) {
      audioRef.current.src = URL.createObjectURL(file);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>⏰ Alarm</h2>

        <button onClick={() => Notification.requestPermission()}>
          Enable Notifications 🔔
        </button>

        <div className="alarm-form">
          <div className="form-group">
            <label htmlFor="alarm-time">Set Time</label>
            <input
              id="alarm-time"
              type="time"
              value={alarmTime}
              onChange={(e) => setAlarmTime(e.target.value)}
            />
          </div>

          <div className="form-group checkbox-group">
            <label htmlFor="repeat-toggle" className="checkbox-label">
              <input
                id="repeat-toggle"
                type="checkbox"
                checked={repeat}
                onChange={() => setRepeat((value) => !value)}
              />
              <span>Repeat Daily</span>
            </label>
          </div>

          <button onClick={addAlarm} disabled={!alarmTime} className="btn-primary">
            + Add Alarm
          </button>

          <div className="form-group">
            <label htmlFor="ringtone" className="file-input-label">
              <span>🎵 Upload Ringtone</span>
              <input
                id="ringtone"
                type="file"
                accept="audio/*"
                onChange={handleRingtoneUpload}
              />
            </label>
          </div>

          <button onClick={() => audioRef.current.play()} className="btn-secondary">
            🔊 Test Sound
          </button>
        </div>

        <div className="alarms-list-section">
          <h3>Active Alarms</h3>
          {alarms.length === 0 ? (
            <p className="empty-state">No alarms set yet</p>
          ) : (
            <ul className="alarms-list">
              {alarms.map((alarm) => (
                <li key={alarm.id} className="alarm-item">
                  <div className="alarm-info">
                    <span className="alarm-time">{alarm.time}</span>
                    <span className="alarm-type">
                      {alarm.repeat ? "🔁 Daily" : "⏱️ Once"}
                    </span>
                  </div>
                  <button
                    onClick={() => removeAlarm(alarm.id)}
                    className="btn-remove"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

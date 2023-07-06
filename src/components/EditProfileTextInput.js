import React, { useState } from "react";

// Import Icon ------------------------------------------
import calendarIcon from '../resource/icons/Groupcalendar_icon.svg';
// ------------------------------------------------------

const EditProfileTextInput = ({ user, setUser }) => {

    return (
        <div className="text_form">
            <input
                type="text"
                name="name"
                className="name"
                placeholder="name"
                value={user.name}
                onChange={(event) => { setUser({ ...user, name: event.currentTarget.value }) }}
            />
            <input
                type="text"
                name="username"
                className="username"
                placeholder="username"
                value={user.username}
                onChange={(event) => { setUser({ ...user, username: event.currentTarget.value }) }}
            />
            <input
                type="text"
                name="activity"
                className="activity"
                placeholder="activity"
                value={user.activity}
                onChange={(event) => { setUser({ ...user, activity: event.currentTarget.value }) }}
            />
            <input
                type="date"
                name="birthday"
                className="birthday"
                placeholder="birthday"
                pattern="\d{2}\.\d{2}\.\d{4}"
                value={user.birthday}
                onChange={(event) => { setUser({ ...user, birthday: event.currentTarget.value }) }}
            />
            <img
                className="calendarIcon"
                src={calendarIcon}
                alt="calendarIcon"
            />
            <input
                type="email"
                name="email"
                className="email"
                placeholder="email"
                value={user.email}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                onChange={(event) => { setUser({ ...user, email: event.currentTarget.value }) }}
            />
            <input
                type="tel"
                name="tel"
                className="tel"
                placeholder="phone"
                pattern="(\+[0-9]{2}\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}"
            />
            <select
                name="gender"
                className="gender"
                value={user.gender}
                onChange={(event) => { setUser({ ...user, gender: event.currentTarget.value }) }}>
                <option value="" disabled selected>gender</option>
                <option value="Male">male</option>
                <option value="Female">female</option>
                <option value="Other">other</option>
            </select>
            <input
                type="text"
                name="website"
                className="website"
                placeholder="website"
                value={user.website}
                onChange={(event) => { setUser({ ...user, website: event.currentTarget.value }) }}
            />
            <textarea
                name="aboutme"
                className="aboutme"
                placeholder="about me"
                cols="40" rows="3"
                onChange={(event) => { setUser({ ...user, aboutMe: event.currentTarget.value }) }}
            />
        </div>
    );
}

export default EditProfileTextInput;
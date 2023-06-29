const EditProfileTextInput = () => {
    return (
        <div className="text_form">
            <input type="text" name="name" id="name" placeholder="name" />
            <input type="text" name="username" id="username" placeholder="username" />
            <input type="text" name="activity" id="activity" placeholder="activity" />
            <input type="date" name="date" id="date" value="birth" />
            <input type="email" name="email" id="email" placeholder="email" />
            <input type="tel" name="phone" id="phone" placeholder="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
            <select name="gender" id="gender">
                <option value="" disabled selected>gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
            </select>
            <input type="text" name="website" placeholder="website" />
            {/* <input type="text" name="aboutme" placeholder="about me" /> */}
            <textarea name="aboutme" placeholder="about me" cols="40" rows="3" />
        </div>
    );
}

export default EditProfileTextInput;
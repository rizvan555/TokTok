const EditProfileTextInput = () => {
    return (
        <div className="text_form">
            <input type="text" name="name" id="name" placeholder="name" />
            <input type="text" name="username" id="username" placeholder="username" />
            <input type="text" name="activity" id="activity" placeholder="activity" />
            <input type="number" name="date" id="date" placeholder="birth" />
            <input type="email" name="email" id="email" placeholder="email" />
            <input type="number" name="phone" id="phone" placeholder="phone" />
            <select name="sex" id="sex" placeholder="sex">
                <option value=" " >sex</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
            </select>
            <input type="text" name="website" id="website" placeholder="website" />
        </div>
    );
}

export default EditProfileTextInput;
export const validateInputs = (inputName: string, input: string) : string | null => {
    switch (inputName) {
        case "Room Name":
            if (!input) {
                return "Cannot be empty";
            }
            else if (!/^[a-zA-Z0-9_]+$/.test(input)) {
                return "Invalid Room name";
            }
            break;
        case "Username":
            if (!input) {
                return "Cannot be empty";
            }
            else if (!/^[A-Za-z][A-Za-z0-9_]{0,15}$/.test(input)) {
                return "Invalid username";
            }
            break;
        default:
            if (!input) {
                return " ";
            }
            break;
    }
    return null;
}
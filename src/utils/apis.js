async function fetchAutoComplete() {
    const localStorageKey = "auto_complete_data";
    if (!localStorage.getItem(localStorageKey)) {
        let url = `https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants?maxRecords=10000&view=Grid%20view`;
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer keyfXgn8PL6pB3x32"
            }
        });
        res = await res.json();
        let str = JSON.stringify(res);
        localStorage.setItem(localStorageKey, str);
        return res;
    }
    let data = JSON.parse(localStorage.getItem(localStorageKey));
    return data;
}

async function loginUser(username, password) {
    if (username.length == 0 || password.length == 0) {
        return { success: false, message: "Both username and password is required to login" };
    }
    let url = "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=1000&view=Grid%20view";
    let res = await fetch(url, {
        method: "GET", headers: {
            "Authorization": "Bearer keyfXgn8PL6pB3x32"
        }
    });
    res = await res.json();
    let arr = res.records.filter((v) => {
        console.log("username: ", v.fields.username, username, v.fields.username == username);
        console.log("password: ", v.fields.password, password, v.fields.password == password);
        return v.fields.username == username && v.fields.password == password;
    });
    console.log("credentails: ", arr, res, username, password);
    if (arr.length > 0) {
        localStorage.setItem("user", arr[0].id);
    }
    return { success: arr.length > 0, message: arr.length > 0 ? undefined : "Credentials is incorrect" };
}

export { fetchAutoComplete, loginUser };
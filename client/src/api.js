import axios from "axios";

const ticketsAPI = {
    ticketsLoader: async (data) => {
        try {
            return await axios.get(`/tickets/?limit=${data.counter.limit}&offset=${data.counter.offset}&orderBy=${data.counter.orderBy}&orderType=${data.counter.orderType}`);
        } catch (err) {
            throw err;
        }
    },
    addTicket: async (data) => {
        try {
            return await axios.post('/tickets', data);
        } catch (err) {
            throw err;
        }
    },
    updateTicket: async (data) => {
        try {
            return await axios.put('/tickets/', data);
        } catch (err) {
            throw err;
        }
    },
    deleteTicket: async (ticketID,jiraID) => {
        try {
            return await axios.delete(`/tickets/?id=${ticketID}&jiraID=${jiraID}`);
        } catch (err) {
            throw err;
        }
    }
}

const usersAPI = {
    checkStatus: async () => {
        try {
            return await axios.post("/profile");
        } catch (err) {
            throw err;
        }
    },
    login: async (data) => {
        try {
            return await axios.post('/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            throw err;
        }
    },
    register: async (data) => {
        try{
            return await axios.post('/register', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }catch(err){
            throw err;
        }
    },
    logout: async () => {
        try {
            return await axios.post("/logout");
        } catch (err) {
            throw err;
        }
    },
    delete: async (password) => {
        try {
            return await axios.delete("/profile",{data: password});
        } catch (err) {
            throw err;
        }
    }
}


export { ticketsAPI, usersAPI }
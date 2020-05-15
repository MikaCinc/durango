let User = {
    ID: '',
    Name: '',
    Email: '',
    imageUrl: '',
    Location: '',
    Permissions: {
        canReserve: true,
    },
    Reservation: {
        ID: null,
        Time: '',
    },
    Claps: [],
    Favourites: []
};

export default User;
let User = {
    id: 'nekiID',
    name: '',
    email: '',
    imageUrl: '',
    location: '',
    permissions: {
        canReserve: true,
    },
    reservation: {
        id: null,
        time: '',
    },
    claps: [],
    favourites: []
};

export default User;